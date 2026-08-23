import { useNavigate } from 'react-router-dom';

import { Navbar } from '@/components/Navbar/Navbar';
import {
    AccountButton,
    ErrorCode,
    ErrorPageContainer,
    MessageSub,
    MessageTitle,
    NotFoundContainer,
} from '@/components/NotFoundPage/NotFoundPage.styles';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <ErrorPageContainer>
            <Navbar />
            <NotFoundContainer>
                <ErrorCode variant="h1">404</ErrorCode>
                <MessageTitle variant="h4">Page Not Found</MessageTitle>
                <MessageSub variant="body2">
                    The page you are looking for is unavailable
                </MessageSub>
                <MessageSub variant="body2">
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
