import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const ScrollRestorationLink = ({ to, children }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();

        // Save scroll position to sessionStorage
        sessionStorage.setItem('scrollPosition', window.pageYOffset);

        // Use Next.js's router to navigate to the new page
        router.push(to);
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
};

ScrollRestorationLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default ScrollRestorationLink;
