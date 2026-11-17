import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background px-5 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Back to Login */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <FaArrowLeft />
          Back to Login
        </Link>

        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: 18 November 2026
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-6">
          <p className="leading-7 text-muted-foreground">
            Bob's Garage is an automotive service website that allows customers
            to browse vehicle maintenance services, register accounts, make
            service bookings and manage their bookings online.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            We are committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, store, disclose and
            protect information when you use our website.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            We aim to comply with applicable Australian privacy laws, including
            the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs),
            where applicable.
          </p>
        </section>

        {/* Personal Information */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Personal Information We Collect
          </h2>

          <p className="leading-7 text-muted-foreground">
            When customers register an account or book a vehicle service, we may
            collect:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Full name</li>
            <li>Email address</li>
            <li>Password (stored as a secure hash)</li>
            <li>Contact phone number</li>
            <li>Vehicle make, model and year</li>
            <li>Vehicle registration number</li>
            <li>Service booking date and time</li>
            <li>Selected automotive services</li>
            <li>Booking history and status</li>
          </ul>

          <p className="mt-3 leading-7 text-muted-foreground">
            We may also process information necessary to maintain login sessions
            and operate the website.
          </p>
        </section>

        {/* Use of Information */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. How We Use Your Information
          </h2>

          <p className="leading-7 text-muted-foreground">
            We use personal information to:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Create and manage customer accounts.</li>
            <li>Authenticate users and manage login sessions.</li>
            <li>Process and manage vehicle service bookings.</li>
            <li>Contact customers regarding their bookings.</li>
            <li>Display booking history and service information.</li>
            <li>
              Allow administrators to manage services and customer bookings.
            </li>
            <li>Maintain and improve website functionality and security.</li>
          </ul>
        </section>

        {/* Sensitive Information */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. Sensitive Information
          </h2>

          <p className="leading-7 text-muted-foreground">
            Bob's Garage is not designed to collect sensitive personal
            information, such as health information, religious beliefs or
            biometric data.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            Customers should avoid providing unnecessary sensitive information
            through booking forms or other website features.
          </p>
        </section>

        {/* Third-Party Service */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. Third-Party Services
          </h2>

          <p className="leading-7 text-muted-foreground">
            Bob's Garage uses third-party technology services to support website
            functionality, including:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              MySQL: Stores customer accounts, service information and booking
              records.
            </li>
            <li>ImageKit: Hosts images used throughout the website.</li>
            <li>
              Website and database hosting providers: Support application
              deployment and data storage.
            </li>
          </ul>

          <p className="mt-3 leading-7 text-muted-foreground">
            Where third-party providers process personal information,
            appropriate privacy and security safeguards should be applied.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            Information may be processed or stored outside Australia depending
            on the hosting providers and their configurations.
          </p>
        </section>

        {/* Disclosure */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Disclosure of Personal Information
          </h2>

          <p className="leading-7 text-muted-foreground">
            Personal information may be accessible to authorised Bob's Garage
            administrators where necessary to manage customer accounts and
            service bookings.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            Information may also be disclosed to service providers supporting
            the website or where required or authorised by law. We do not intend
            to sell customer personal information to third parties.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. Security of Personal Information
          </h2>
          <p className="leading-7 text-muted-foreground">
            We take reasonable steps to protect personal information from
            unauthorised access, misuse, loss, modification and disclosure.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            Our application uses:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Bcrypt to securely hash passwords before database storage.</li>
            <li>JSON Web Tokens (JWT) for user authentication.</li>
            <li>
              Authentication middleware to protect restricted API endpoints.
            </li>
            <li>
              Role-based authorisation to restrict administrative functions.
            </li>
            <li>
              Input validation to help prevent invalid or malicious data
              submissions.
            </li>
            <li>
              Environment variables to protect database credentials and API
              secrets.
            </li>
          </ul>

          <p className="mt-3 leading-7 text-muted-foreground">
            Although these measures help protect information, no online system
            can guarantee complete security.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            7. Data Retention
          </h2>

          <p className="leading-7 text-muted-foreground">
            Personal information is retained for as long as reasonably necessary
            to provide our services, manage customer accounts and bookings, or
            meet applicable legal obligations.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            Information that is no longer required will be securely deleted or
            de-identified where appropriate.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            8. Children's Privacy
          </h2>
          <p className="leading-7 text-muted-foreground">
            Bob's Garage is intended for customers seeking automotive
            maintenance and repair services.
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            The website is not specifically designed for children, and we do not
            intentionally collect personal information from children through
            dedicated children's services.
          </p>
        </section>

        {/* Access and Corrections */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            9. Access and Corrections
          </h2>

          <p className="leading-7 text-muted-foreground">
            Customers may request access to or correction of their personal
            information by contacting Bob's Garage. We may need to verify the
            customer's identity before processing a request to protect personal
            information from unauthorised disclosure.
          </p>
        </section>

        {/* Information Quality */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            10. Maintaining Information Quality
          </h2>

          <p className="leading-7 text-muted-foreground">
            We aim to keep personal information accurate, complete and up to
            date. Customers should provide accurate contact and vehicle
            information when registering accounts or making bookings. Authorised
            administrators may update booking records where necessary to support
            service operations.
          </p>
        </section>

        {/* Policy Updates */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            11. Policy Updates
          </h2>

          <p className="leading-7 text-muted-foreground">
            This Privacy Policy may be updated when changes are made to our
            website, services, technology or personal information handling
            practices. The latest version will be available on the Bob's Garage
            website.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-3">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            12. Privacy Enquiries and Complaints
          </h2>

          <p className="leading-7 text-muted-foreground">
            If you have questions, wish to request access to your information,
            or want to make a privacy complaint, please contact:
          </p>

          <p className="leading-7 text-muted-foreground">
            Email: bob_garage@service.com
          </p>
          <p className="leading-7 text-muted-foreground">
            Website:{" "}
            <a
              href="https://bob-garage-fullstack-7ufr.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              bob-garage-fullstack-7ufr.vercel.app
            </a>
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            We will review privacy enquiries and complaints and respond within a
            reasonable timeframe.
          </p>
        </section>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
