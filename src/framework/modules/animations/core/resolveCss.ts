export function resolveCssValue(
    valueOrElement: string | number | Element | null | undefined,
    property: string
): string | null {

    // No value to resolve
    if (valueOrElement == null || valueOrElement === "") {
        return null;
    }

    // Create temporary element to be read
    const el = document.createElement("div");

    // Ensure temporary element doesn't disrupt layout
    el.style.position = "fixed";
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";

    // If element already exists...
    if (valueOrElement instanceof Element) {

        el.style.setProperty(
            property,
            getComputedStyle(valueOrElement).getPropertyValue(property)
        );

    // Otherwise, apply and read the value
    } else {
        el.style.setProperty(property, String(valueOrElement));
    }

    // Add temp element to the document
    document.body.appendChild(el);

    // Read resolved value
    const resolved = getComputedStyle(el)
        .getPropertyValue(property);

    // Remove temporary element
    el.remove();

    return resolved;
}