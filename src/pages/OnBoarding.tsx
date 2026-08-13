import React, { useState } from 'react';

import Login from '../components/Login';
import SignUp from '../components/SignUp';

const OnBoarding = () => {
    const authPage = useState(false);

    return <>{authPage ? <Login /> : <SignUp />}</>;
};

export default OnBoarding;
