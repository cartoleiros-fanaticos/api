import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";

function redirect() {
    
    useEffect(() => {
        navigate('/')
    }, [])

    return <div />;
}

export default redirect;