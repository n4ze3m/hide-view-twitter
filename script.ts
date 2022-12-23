
function getAllTweet() {
    const tweets = document.querySelectorAll('div');
    const tweetsToRemove = [];

    tweets.forEach(tweet => {
        const a = tweet.querySelector('a');
        if (a) {
            const getAreaLabel = a.getAttribute('aria-label');
            if (getAreaLabel?.includes("View Tweet analytics")) {
                tweetsToRemove.push(a.parentElement);
            }
        }
    });

    tweetsToRemove.forEach(tweet => tweet.remove());
}



export function injectScript() {

    console.log("Injecting script tor remove view count tweets");

    document.addEventListener('load', () => getAllTweet());

    new PerformanceObserver((_) => {
        getAllTweet()
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    document.addEventListener('scroll', () => getAllTweet());

    new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                getAllTweet()
            }
        })
    }
    ).observe(document.body, { childList: true, subtree: true });

}