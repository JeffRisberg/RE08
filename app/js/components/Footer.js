import React from 'react'
import { Link } from 'react-router'

/**
 * Appears at bottom of screen
 *
 * @author Jeff Risberg, Brandon Risberg
 * @since April 30, 2016
 */
class Footer extends React.Component {
    render() {
        return (
            <div>
                <div className="footer" style={{marginLeft: '+15px', marginRight: '+15px'}}>
                    <div className="row white footer-links">
                        <div className="col-md-12 text-center">
                            Charitable donation services provided by <a href="http://www.justgive.org">JustGive.org</a>
                        </div>
                    </div>
                    <div className="row darkgrey footer-links">
                        <div className="col-md-6 text-left">
                            <a href="https://gofarrewards.wf.com/#/Help">Help</a>
                            <a href="https://gofarrewards.wf.com/#/ContactUs" className="margin-l">Contact Us</a>
                        </div>
                        <div className="col-md-6 text-right">
                            <a data-toggle="modal" href="#" data-target="#spanishModal" className="margin-r">Español</a>
                            <a href="https://gofarrewards.wf.com/#/AccountSettings" className="margin-r">Account
                                Settings</a>
                            <a href="https://www.wellsfargo.com/privacy-security/" className="margin-r">Privacy
                                Policy</a>
                            <a href="https://gofarrewards.wf.com/#/tnc">Terms and Conditions</a>
                        </div>
                    </div>
                    <div className="row dark-gray copyright">
                        <div className="col-md-12 text-right">
                            Copyright &copy; 1999-2016 Wells Fargo Bank, N.A. All Rights Reserved.
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="spanishModal" tabIndex="-1" role="dialog"
                     aria-labelledby="spanishModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Español</h4>
                            </div>
                            <div className="modal-body">
                                Para asistencia en español, llame al Centro de Servicios de Go Far Rewards al
                                1-877-517-1358 y marque 2.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
