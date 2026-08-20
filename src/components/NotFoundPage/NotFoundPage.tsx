import { useNavigate } from 'react-router-dom';

import {
    AccountButton,
    ErrorCode,
    ErrorPageContainer,
    MessageSub,
    MessageTitle,
    NotFoundContainer,
} from './NotFoundPage.styles';
import { Navbar } from '../Navbar/Navbar';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <ErrorPageContainer>
            <Navbar />
            <NotFoundContainer>
                <ErrorCode variant="h1">404</ErrorCode>
                <MessageTitle variant="h4">Page Not Found</MessageTitle>
                <MessageSub variant="body1">
                    The page you are looking for is unavailable
                </MessageSub>
                <MessageSub>
                    Create your account today and try out Khanna Penna
                </MessageSub>
                <AccountButton
                    variant="contained"
                    color="primary"
                    onClick={() => void navigate('/signup')}
                >
                    Create Account
                </AccountButton>
            </NotFoundContainer>
        </ErrorPageContainer>
    );
};
