import './videoEmbed.scss'

export function VideoEmbed() {
    return (
        <>
            <div className='embed-wrap'>
            <iframe
                className="embed"
                src="https://player.vimeo.com/video/1247587194?autoplay=1&muted=1&loop=1&controls=0&autopause=0"
                style={{
                    width: "100%",
                    aspectRatio: 16 / 9,
                    border: 0
                }}
                allow="autoplay; fullscreen"
                title="K2 Header"
                allowFullScreen
            />
            <iframe
                className="embed mobile"
                src="https://player.vimeo.com/video/1247597414?autoplay=1&muted=1&loop=1&controls=0&autopause=0"
                style={{
                    width: "100%",
                    aspectRatio: 9/16,
                    border: 0
                }}
                allow="autoplay; fullscreen"
                title="K2 Header"
                allowFullScreen
            />
            </div>
        </>
    );
}