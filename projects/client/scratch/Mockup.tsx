import * as React from 'react';

const Application: React.FunctionComponent = () => {
    return (
        <div className="application-container">
            <div className="modal-overlay" id="error">
                <div className="modal" id="error-box">
                    <h1 className="modal-header-title">Edit user</h1>
                    <div className="modal-body-container">
                        <div className="modal-map-container"></div>
                        <div className="modal-input-container">
                            <div>
                                <label htmlFor="name" className="default-input-label">Name</label>
                                <input id="name" className="default-input" type="text"></input>
                            </div>
                            <div>
                                <label htmlFor="location" className="default-input-label">Location</label>
                                <input id="location" className="default-input" type="text"></input>
                            </div>
                            <div>
                                <label htmlFor="description" className="default-input-label">Description</label>
                                <input id="description" className="default-input" type="text"></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer-container">
                        <div className="modal-footer-empty-container">

                        </div>
                        <div className="modal-footer-button-container">
                            <button className="default-button modal-input-button">Save</button>
                            <button className="default-button modal-input-cancel-button modal-input-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="application-container-style">
                <div className="application-header">
                    <div className="user-card-grid-element">
                        <h1 className="application-header-title">Users list</h1>
                    </div>
                    <div className="user-card-grid-element">
                        <div style={{ flexGrow: 1 }}></div>
                    </div>
                    <div className="user-card-grid-element">
                        <input className="search-input default-input" type="text" placeholder="Search..."></input>
                    </div>
                </div>
                <div className="infinite-scroll-box">
                    <div className="infinite-scroll-box-inner">
                        <div className="user-card-grid-element user-card-grid-element-row-element">
                            <div className="user-card">This is text</div>
                        </div>
                        <div className="user-card-grid-element user-card-grid-element-row-element">
                            <div className="user-card">This is text</div>
                        </div>
                        <div className="user-card-grid-element user-card-grid-element-row-element">
                            <div className="user-card">This is text</div>
                        </div>
                        <div className="user-card-grid-element user-card-grid-element-row-element">
                            <div className="user-card">This is text</div>
                        </div>
                        <div className="user-card-grid-element user-card-grid-element-row-element">
                            <div className="user-card">This is text</div>
                        </div>
                        <div className="user-card-grid-element user-card-grid-element-row-element">
                            <div className="user-card">This is text</div>
                        </div>
                        <div className="user-card-grid-element user-card-grid-element-row-element">
                            <div className="user-card">This is text</div>
                        </div>
                    </div>
                    <div className="infinite-scroll-box-load">
                        <div className="default-button-container">
                            <button className="default-button">Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Application;