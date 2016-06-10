import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

import Block from './Block';
import {setPage } from '../actions/pageName'

/**
 * Renders the blocks in a page.  Subscribes to portal content, and pageName content.
 *
 * @author Jeffrey Risberg
 * @since May 2016
 */
class Page extends React.Component {

    componentDidMount() {
        var pageName = (this.props.pageName) ? this.props.pageName : 'Landing';
        console.log('params.name: ' + pageName);
    }

    render() {
        var pageName = (this.props.pageName) ? this.props.pageName : 'Landing';

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
                    "url": "/images/Image02.jpg"
                },
                {
                    "id": "2-2-1-login",
                    "name": "2-2-1-login",
                    "row": "2", "col": "1", "width": "12", "type": "login"
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
                    "id": "4-2-12-creditCardForm",
                    "name": "4-2-12-creditCardForm",
                    "row": "2", "col": "1", "width": "12", "type": "creditCardForm"
                }
            ],
            "5": [
                {
                    "row": "1", "col": "1", "width": "12", "type": "image",
                    "url": "/images/Image02.jpg"
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
                    "row": "1", "col": "1", "width": "12", "type": "searchCharities"
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
                    "id": "9-1-1-gift",
                    "name": "9-1-1-gift",
                    "row": "1", "col": "1", "width": "12", "type": "gift"
                }
            ],
            "10": [
                {
                    "id": "10-1-12-givingBasket",
                    "name": "10-1-12-givingBasket",
                    "row": "1", "col": "1", "width": "12", "type": "givingBasket"
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
                    "id": "12-1-12-givingHistory",
                    "name": "11-1-12-givingHistory",
                    "row": "1", "col": "1", "width": "12", "type": "confirmation"
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
        const blocks = portalBlocks[portalPages[pageName]];
        // End temporary hack here

        if (pageName == null) return null;

        const blockNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
            const rowBlocks = blocks.filter((block) => (block.row == ("" + index)));
            if (rowBlocks.length > 0) {
                return (
                    <div key={index} className="row">
                        {rowBlocks.map((block, index) => {
                            const theClass = "col-md-" + block.width;
                            return <div key={index} className={theClass}>
                                <Block key={index} block={block}/>
                            </div>
                        })}
                    </div>
                );
            }
            else
                return null;
        });

        return (
            <div className="content-region">
                {blockNodes}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pageName: state.pageName,
        portal: state.portal
    };
};
export default connect(
    mapStateToProps,
    {setPage}
)(Page);

