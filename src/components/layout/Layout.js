import createFooter from "./Footer";
import createNav from "./Nav";
import createHeader from "./Header";

const createLayout = ({ content, router }) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full ">
      ${createHeader().html}
      ${createNav(router).html}
      ${content.html}
      ${createFooter().html}
    </div>
  </div>
`;

export default createLayout;
