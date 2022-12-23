import { injectScript } from "~script";

export { };



if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.get(['hideViewCountTweets'], (item) => {
        const isEmptyItem = Object.keys(item).length === 0 && item.constructor === Object;
        if (item.hideViewCountTweets || isEmptyItem) {
            injectScript();
        }
    });
}
