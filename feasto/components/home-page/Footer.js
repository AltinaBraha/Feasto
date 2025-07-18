import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";


export default function Footer() {
  return (

<footer className="bg-black text-white px-8 py-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
   <div className="flex flex-col items-start space-y-4">
  <div className="relative w-48 h-16 mr-16">
    <Image
      src="/img/logo.png"
      alt="Feasto Logo"
      layout="fill"
      objectFit="contain"
      priority
    />
  </div>
  <p className="text-m leading-relaxed">
    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
    In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
  </p>
  <div className="flex mt-2 space-x-4 text-white text-lg">
    <a href="#" aria-label="Facebook" className="hover:text-orange-500"><FaFacebookF /></a>
    <a href="#" aria-label="Twitter" className="hover:text-orange-500"><FaTwitter /></a>
    <a href="#" aria-label="Instagram" className="hover:text-orange-500"><FaInstagram /></a>
    <a href="#" aria-label="LinkedIn" className="hover:text-orange-500"><FaLinkedinIn /></a>
  </div>
</div>

    <div>
      <h3 className="text-lg font-semibold mb-3">Working Hours</h3>
      <ul className="text-m space-y-1 leading-relaxed">
        <li>Monday - Friday: 09:00 - 22:00</li>
        <li>Saturday: 11:00 - 00:00</li>
        <li>Sunday: 11:00 - 23:00</li>
        <li className="mt-2 font-semibold text-orange-500">
          * Happy hour: 17:00 - 21:00
        </li>
      </ul>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Our Address</h3>
      <p className="text-m">Silk St, Barbican, London EC2Y 8DS, UK</p>
      <p className="text-m">+39-055-123456</p>
      <p className="text-m">booking@patiotime.com</p>
    </div>

    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Newsletter</h3>
      <p className="text-m">Receive the latest news from us.</p>
      <input
        type="email"
        placeholder="Your Email Address"
        className="w-full px-3 py-2 mb-2 text-black text-sm border-b border-white bg-transparent placeholder-white focus:outline-none"
      />
      <div className="flex items-start gap-2 text-sm">
        <input type="checkbox" id="privacy" />
        <label htmlFor="privacy">I agree to the Privacy Policy</label>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm space-y-4 md:space-y-0">
    <p>© Copyright PatioTime WordPress Theme for Restaurant & Cafe.</p>
    <div className="flex space-x-6">
      <a href="#" className="hover:text-orange-500">Privacy</a>
      <a href="#" className="hover:text-orange-500">Term of Use</a>
      <a href="#" className="hover:text-orange-500">Policy</a>
    </div>
  </div>
</footer>

  );
}
