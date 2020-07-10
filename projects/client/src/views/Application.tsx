import * as React from 'react';

const Application: React.FunctionComponent = () => {
    return (
        <div className="application-container">
            <div className="application-container-style">
                <div className="application-header">
                    <div className="user-card-grid-element">
                        <h1 className="application-header-title">Users list</h1>
                    </div>
                    <div className="user-card-grid-element">
                        <div style={{ flexGrow: 1 }}></div>
                    </div>
                    <div className="user-card-grid-element">
                        <input className="search-input" type="text" placeholder="Search..."></input>
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
                </div>
                <div className="infinite-scroll-box-load">
                    <div className="load-more-button-container">
                        <button className="load-more-button" disabled={true}>Load More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Application;