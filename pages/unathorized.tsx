import DefaultLayoutNoHeaderSideBar from "../components/Layouts/DefaultLayoutNoHeaderSideBar";
import React from "react";

export default function Unathorized() {
    return (
        <DefaultLayoutNoHeaderSideBar>
            <div className="container">
                <div className="d-flex align-items-center justify-content-center unauthorized-page-style">
                    <h3>Unauthorized to access the resource.</h3>
                </div>
            </div>
        </DefaultLayoutNoHeaderSideBar>
    )
}
