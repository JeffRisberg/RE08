/**
 * This is used for the top charities display area
 */
import fetch from 'isomorphic-fetch';

import { SET_PORTAL } from '../constants/ActionTypes'
import { fetchVendor } from '../actions/vendor'

export const fetchPortal = () => {
    return function (dispatch) {
        return fetch('/ws/portal/', {})
            .then(response => response.json())
            .then((json) => {

                dispatch({
                        type: SET_PORTAL,
                        portal: json.data
                    }
                );
                console.log('fetching vendor ' + json.data.id)
                dispatch(fetchVendor(json.data.id));
            });
    };
};

//this will eventually dispatch a fetch
export const getPageBlocks = (portal, pageName) => {
    if (!portal || !pageName) return [];

    // Begin temporary hack here
    const portalPages = {
        "Landing": "1",
        "Login": "2",
        "Donate": "3",
        "Checkout": "4",
        "Test": "5",
        "Search": "6",
        "Slider": "7",
        "Categories": "8",
        "Gift": "9",
        "Basket": "10",
        "GivingHistory": "11",
        "Confirmation": "12",
        "TestLanding": "111"
    };
    const portalBlocks = {
        "1": [
            {
                "row": "1", "col": "1", "width": "12", "type": "image",
                "url": "/images/Image01.jpg"
            },
            {
                "row": "2", "col": "1", "width": "4", "type": "text",
                "text": "<h2>Donate Now</h2>We support one-time or monthly donations"
            },
            {
                "row": "2", "col": "2", "width": "4", "type": "text",
                "text": "<h2>Search</h2>[Search|/Search] by cause or by charity, by location, or by keyword."
            },
            {
                "row": "2", "col": "3", "width": "4", "type": "text",
                "text": "<h2>Gift Cards</h2>Buy or redeem gift cards for your friends"
            },
            {
                "row": "3", "col": "1", "width": "12", "type": "hr"
            },
            {
                "row": "4", "col": "1", "width": "12", "type": "topCharities",
                "id": "1-4-1-topCharities",
                "name": "1-4-1-topCharities"
            },
            {
                "row": "5", "col": "1", "width": "12", "type": "hr"
            },
            {
                "id": "1-6-1-categories",
                "name": "1-6-1-categories",
                "row": "6", "col": "1", "width": "4", "type": "categories"
            },
            {
                "id": "1-6-12-charities",
                "name": "1-6-12-charities",
                "row": "6", "col": "12", "width": "8", "type": "charities",
                "categorySourceName": "1-6-1-categories",
                "withImage": "false", "direction": "vertical"
            }
        ],
        "2": [
            {
                "row": "1", "col": "1", "width": "12", "type": "image",
                "url": "/images/Image01.jpg"
            },
            {
                "row": "2", "col": "1", "width": "6", "type": "login",
                "headerText": "Returning Donors",
                "subHeaderText": "Already have an account?",
                "id": "2-2-1-login",
                "name": "2-2-1-login"
            },
            {
                "row": "2", "col": "2", "width": "6", "type": "createAccount",
                "headerText": "Create a New Account",
                "subHeaderText": "If you have not yet created an account with us, please do so now.",
                "id": "2-3-2-createAcount",
                "name": "2-3-2-createAcount"
            }
        ],
        "3": [
            {
                "id": "3-1-1-donation",
                "name": "3-1-1-donation",
                "row": "1", "col": "1", "width": "12", "type": "image",
                "url": "/images/Image01.jpg"
            },
            {
                "id": "3-2-1-donation",
                "row": "2", "col": "1", "width": "12", "type": "text", "text": "&nbsp;"
            },
            {
                "id": "3-3-1-donation",
                "name": "3-3-1-donation",
                "row": "3", "col": "1", "width": "6", "type": "donate",
                "recurringDonation": false,
                "instructionalText": "I would like to donate:",
                "shareName": "true", "shareAddress": "true"
            },
            {
                "id": "3-3-2-donation",
                "name": "3-3-2-donation",
                "row": "3", "col": "2", "width": "4", "type": "match", donationSource: "3-3-1-donation",
                "headerText": "75% Matching",
                "mainText": "These donations are matched by Purina Corp. " +
                "With your donation plus the match, the charity will receive:",
                "percent": 75,
                "startAt": 0,
                "maxValue": 1000000
            }
        ],
        "4": [
            {
                "row": "1", "col": "1", "width": "12", "type": "image",
                "url": "/images/Image01.jpg"
            },
            {
                "row": "2", "col": "1", "width": "12", "type": "headerBlock",
                "headerText": "Review And Complete Your Donations",
                "subHeaderText": "Please confirm all your information, and choose a Payment Method (Visa, Mastercard, Discover or American Express, or use a Gift Card). When you are finished, please click the Complete Donation button.",
                "size": "2",
                "id": "4-2-1-headerBlock",
                "name": "4-2-1-headerBlock"
            },
            {
                "row": "3", "col": "1", "width": "12", "type": "headerBlock",
                "headerText": "Donation Summary",
                "subHeaderText": "Note: Your donation summary includes any donations saved to your basket during past sessions.",
                "size": "3",
                "id": "4-3-1-headerBlock",
                "name": "4-3-1-headerBlock"
            },
            {
                "row": "4", "col": "1", "width": "12", "type": "givingBasket",
                "headerText": "Donations",
                "displayButtons": "false",
                "showCharityAddress": "false",
                "showCharityEin": "false",
                "id": "4-4-1-givingBasket",
                "name": "4-4-1-givingBasket"
            },
            {
                "row": "5", "col": "1", "width": "12", "type": "headerBlock",
                "headerText": "Payment Method",
                "subHeaderText": "Charge the total to your Credit Card.",
                "size": "3",
                "id": "4-5-1-headerBlock",
                "name": "4-5-1-headerBlock"
            },
            {
                "row": "5", "col": "1", "width": "12", "type": "creditCardForm",
                "id": "4-5-12-creditCardForm",
                "name": "4-5-12-creditCardForm"
            },
            {
                "row": "6", "col": "1", "width": "12", "type": "text",
                "text": "Please note the your credit card will be charged by JustGive and 4.5% plus 35 cents will be deducted from your transaction to cover processing and handling costs.<br/>"
            },
            {
                "row": "7", "col": "1", "width": "12", "type": "text",
                "text": "By clicking the &quot;Complete Donation&quot; button below I agree to the Terms and Conditions and I understand that my donation is non-refundable and that the donation will be disbursed on the 10th of the following month."
            }
        ],
        "5": [
            {
                "row": "1", "col": "1", "width": "12", "type": "image",
                "url": "/images/Image01.jpg"
            },
            {
                "row": "2",
                "col": "1",
                "width": "12",
                "type": "text",
                "text": "Testing the pageName/routing integration:"
            },
            {
                "row": "3", "col": "1", "width": "12", "type": "text", "text": "Seems to be working!"
            }
        ],
        "6": [
            {
                "id": "6-1-1-searchCharities",
                "name": "6-1-1-searchCharities",
                "row": "1", "col": "1", "width": "12", "type": "searchCharities",
                "headerText": "Search for a Charity"
            }
        ],
        "7": [
            {
                "id": "7-1-1-image",
                "name": "7-1-1-image",
                "row": "1", "col": "1", "width": "12", "type": "image",
                "url": "/images/Image01.jpg"
            },
            {
                "id": "7-2-1-slider",
                "name": "7-2-1-slider",
                "row": "2", "col": "1", "width": "12", "type": "slider",
                "images": [
                    {"url": "/resources/images/ImageWF.jpg"},
                    {
                        "url": "/resources/images/Image01.jpg",
                        "color": "dk_purple", "location": "upleft",
                        "headerText": "COMPANY GIVING FOR <span>GREATER GOOD</span>",
                        "subText": "Connect your giving programs to your community and <span>social responsibility goals.</span> Choose solutions that make the most impact.",
                        "buttonText": "Learn More",
                        "buttonLink": "www.justgive.org"
                    },
                    {
                        "url": "/resources/images/Image06.jpg",
                        "color": "disaster_red", "location": "upright",
                        "headerText": "NONPROFITS: <span>GET MORE</span> ONLINE DONATIONS",
                        "subText": "Our efficient tools and services—<span>with free donation buttons and fundraising pages</span>—help you raise more money.",
                        "buttonText": "Sign Up Today",
                        "buttonLink": "www.justgive.org"
                    },
                    {
                        "url": "https://unsplash.it/1000/305?image=1036",
                        "color": "turq", "location": "bottomleft",
                        "headerText": "THIS WAS CONFIGURED IN PORTAL CONFIG",
                        "subText": "This content was stored on the database side in Portal Config and sent to front-end.",
                        "buttonText": "Click here",
                        "buttonLink": "www.justgive.org"
                    }]
            }
        ],
        "8": [
            {
                "id": "1-1-12-searchCharities",
                "name": "1-1-12-searchCharities",
                "row": "1", "col": "1", "width": "12", "type": "categories"
            }
        ],
        "9": [
            {
                "row": "1", "col": "1", "width": "12", "type": "gift",
                "headerText": "Gift Options",
                "id": "9-1-1-gift",
                "name": "9-1-1-gift"
            }
        ],
        "10": [
            {
                "row": "1", "col": "1", "width": "12", "type": "headerBlock",
                "headerText": "Items in Your Basket",
                "subHeaderText": "Review the items in your basket below. You may edit your selections or add new ones and will have another chance to review before payment. Note: Your donation summary includes any donations made to your basket during past sessions.",
                "size": "2",
                "id": "4-1-1-headerBlock",
                "name": "4-1-1-headerBlock"
            },
            {
                "row": "2", "col": "1", "width": "12", "type": "givingBasket",
                "headerText": "Your Donations",
                "displayButtons": "true",
                "showCharityAddress": "true",
                "showCharityEin": "false",
                "id": "10-2-12-givingBasket",
                "name": "10-2-12-givingBasket"
            }
        ],
        "11": [
            {
                "id": "11-1-12-givingHistory",
                "name": "11-1-12-givingHistory",
                "row": "1", "col": "1", "width": "12", "type": "givingHistory"
            }
        ],
        "12": [
            {
                "row": "1", "col": "1", "width": "12", "type": "headerBlock",
                "headerText": "Order Confirmation",
                "subHeaderText": "Thank you for your generous donations.",
                "size": "2",
                "id": "4-1-1-headerBlock",
                "name": "4-1-1-headerBlock"
            },
            {
                "row": "2", "col": "1", "width": "12", "type": "hr"
            },
            {
                "row": "4", "col": "1", "width": "12", "type": "confirmation",
                "displayButtons": "false",
                "showCharityAddress": "false",
                "showCharityEin": "false",
                "id": "12-4-1-confirmation",
                "name": "12-4-1-confirmation"
            }
        ],
        "111": [
            {
                "row": "1", "col": "1", "width": "12", "type": "image",
                "url": "/images/Image01.jpg"
            },
            {
                "row": "2", "col": "1", "width": "4", "type": "text",
                "text": "<h2>Donate Now</h2>We support one-time or monthly donations"
            },
            {
                "row": "2", "col": "2", "width": "4", "type": "text",
                "text": "<h2>Search</h2>Search by cause or by charity, by location, or by keyword."
            },
            {
                "row": "2", "col": "3", "width": "4", "type": "text",
                "text": "<h2>Gift Cards</h2>Buy or redeem gift cards for your friends"
            },
            {
                "row": "3", "col": "1", "width": "12", "type": "hr"
            },
            {
                "id": "1-4-1-topCharities",
                "name": "1-4-1-topCharities",
                "row": "4", "col": "1", "width": "12", "type": "topCharities"
            }
        ]

    };
    console.log("Page: going to page " + pageName);
    const portalPage = portalPages[pageName];

    // End temporary hack here
    return portalBlocks[portalPage];
};
