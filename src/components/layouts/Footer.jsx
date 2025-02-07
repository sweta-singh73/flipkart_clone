import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Header.css";

const footerLinks = [
  {
    title: "ABOUT",
    links: [
      "Contact Us",
      "About Us",
      "Careers",
      "Flipkart Stories",
      "Press",
      "Flipkart Wholesale",
      "Cleartrip",
    ],
  },
  {
    title: "HELP",
    links: [
      "Payments",
      "Shipping",
      "Cancellation & Returns",
      "FAQ",
      "Report Infringement",
    ],
  },
  {
    title: "CONSUMER POLICY",
    links: [
      "Cancellation & Returns",
      "Terms of Use",
      "Security",
      "Privacy",
      "Sitemap",
      "Grievance Redressal",
      "EPR Compliance",
    ],
  },
  {
    title: "SOCIAL",
    links: ["Facebook", "Twitter", "YouTube"],
  },
];

const address = [
  "Flipkart Internet Private Limited",
  "Buildings Alyssa, Begonia & Clove Embassy Tech Village",
  "Outer Ring Road, Devarabeesanahalli Village",
  "Bengaluru, 560103, Karnataka, India",
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-links">
        {footerLinks.map(({ title, links }) => (
          <div className="footer-column" key={title}>
            <h4>{title}</h4>
            <ul>
              {links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-right">
        {["Mail Us:", "Registered Office Address:"].map((title, idx) => (
          <div className="footer-column" key={title}>
            <h4>{title}</h4>
            {address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {idx === 1 && (
              <>
                <p>CIN: U51109KA2012PTC066107</p>
                <p>Telephone: 044-45614700</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2007-2024 Flipkart.com</p>
      <div className="footer-social">
        {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, idx) => (
          <Icon key={idx} className="social-icon" />
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
