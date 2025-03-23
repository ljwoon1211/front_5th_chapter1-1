import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

const Layout = ({ content, router }) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full ">
      ${Header()}
      ${Nav(router).html}
      ${content.html}
      ${Footer()}
    </div>
  </div>
`;

export default Layout;
