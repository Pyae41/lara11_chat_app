import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Home = ({ auth }) => {
    return <>Message</>;
};

Home.layout = (page) => {
    return (
        <AuthenticatedLayout user={page.props.auth.user}>
            <ChatLayout children={page}>Message</ChatLayout>
        </AuthenticatedLayout>
    );
};

export default Home;
