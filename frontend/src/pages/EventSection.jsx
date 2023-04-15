import React, { useEffect } from "react";
import Header from "../components/Navbar";

const EventSection = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://allevents.in/scripts/public/ae-plugin-embed-lib.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <>
            <Header />
            <div
                className="ae-embed-plugin"
                data-type="city"
                data-cityname="Mumbai"
                data-category="Art"
                data-sort={0}
                data-header={1}
            ></div>
        </>
    );
};

export default EventSection;