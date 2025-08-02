function Footer() {
  return <div>
    <footer className="bg-neutral-600">
     <hr className="my-4 border-neutral-700 sm:mx-auto dark:bg-neutral-700 lg:my-6 mt-auto"/>
    <p className="flex  justify-center font-semibold font-serif">
      Copyright  &copy; {new Date().getFullYear()} Bennett, Coleman & Co. Ltd. All rights reserved. For reprint rights:
    </p>
    </footer>
  </div>;
}

export default Footer;


