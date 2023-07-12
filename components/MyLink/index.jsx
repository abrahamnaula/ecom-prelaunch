import { useRouter } from 'next/router';

const MyLink = ({ href, children }) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href).then(() => {
            router.reload();
        });
    };

    return (
        <a href={href} onClick={handleClick}>
            {children}
        </a>
    );
};
export default MyLink
// Usage example
/*
const MyComponent = () => {
    return (
        <div>
            <MyLink href="/collections/1">Go to ID 1</MyLink>
            <MyLink href="/collections/2">Go to ID 2</MyLink>
        </div>
    );
};
*/