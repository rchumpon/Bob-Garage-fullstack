import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Back to Login */}
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft />
          Back to Login
        </Link>

        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: 30 October 2026
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-6">
          <p className="leading-7 text-gray-600">
            The Oakleigh Raptors Coaching Assistant is a web application
            designed to help basketball coaches manage teams and player
            substitutions during games. The application also allows
            administrators to create and manage coach and administrator
            accounts.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            We are committed to protecting personal information. This Privacy
            Policy explains how information is collected, used, disclosed,
            stored and protected.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            We aim to comply with applicable Australian privacy laws, including
            the Australian Privacy Principles (APPs) under the Privacy Act 1988
            (Cth), where applicable.
          </p>
        </section>

        {/* Personal Information */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            1. Personal Information We Collect
          </h2>

          <p className="leading-7 text-gray-600">
            When administrators create user accounts, the application collects
            the following information:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Name</li>
            <li>Username</li>
            <li>Password</li>
            <li>User role (Admin or Coach)</li>
          </ul>

          <p className="mt-3 leading-7 text-gray-600">
            Coaches can create and manage teams and players using jersey
            numbers. The application also stores team information, game details,
            substitution records and playing time. Player names are not
            collected or stored.
          </p>
        </section>

        {/* Use of Information */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            2. How We Use Your Information
          </h2>

          <p className="leading-7 text-gray-600">
            We use the information collected to:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Create and manage user accounts.</li>
            <li>Authenticate administrators and coaches.</li>
            <li>Manage user roles and permissions</li>
            <li>Organise teams and player jersey numbers.</li>
            <li>Record player substitutions during games.</li>
            <li>Track player participation and playing time.</li>
          </ul>
        </section>

        {/* Sensitive Information */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            3. Sensitive Information
          </h2>

          <p className="leading-7 text-gray-600">
            The application is not designed to collect sensitive information,
            such as health information. if this changes, our privacy practices
            and this policy will be reviewed.
          </p>
        </section>

        {/* Third-Party Service */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            4. Third-Party Services
          </h2>

          <p>
            The application may use third-party hosting, database and technology
            services to support its operation. Where these services process
            personal information, appropriate privacy and security safeguards
            should be applied.
          </p>
        </section>

        {/* Disclosure */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            5. Disclosure of Personal Information
          </h2>

          <p>
            Personal information may be disclosed to authorized administrators
            and coaches where necessary for their responsibilities, to service
            providers supporting the application, or where required or
            authorized by law.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Access to information is intended to be restricted according to user
            roles and permissions.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            6. Security of Personal Information
          </h2>
          <p className="leading-7 text-gray-600">
            We are committed to protecting personal information against misuse,
            loss, unauthorized access, modification, and disclosure.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Our application uses Better Auth to manage user authentication and
            login sessions. Passwords are securely hashed before being stored in
            the application's database
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Access to the application is restricted through user authentication
            and role-based permissions for administrators and coaches. We also
            use protected API routes and input validation to help safeguard
            information.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            7. Data Retention
          </h2>

          <p className="leading-7 text-gray-600">
            Personal information will be retained only for as long as necessary
            for authorized application purposes or as required by applicable
            law. Information that is no longer required will be handled
            according to the organization's agreed retention and deletion
            procedures.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            8. Children's Privacy
          </h2>
          <p className="leading-7 text-gray-600">
            The application does not collect player names. However, it may store
            jersey numbers associated with junior basketball players.
          </p>

          <p>
            Jersey numbers may still identify players when combined with team or
            game information. We aim to minimise the collection of player
            information and restrict access to authorised users.
          </p>
        </section>

        {/* Access and Corrections */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            9. Access and Corrections
          </h2>

          <p className="leading-7 text-gray-600">
            Users may request access to or correction of their personal
            information by contacting the designated privacy contact or
            application administrator. Identify verification may be required
            before information is released.
          </p>
        </section>

        {/* Information Quality */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            10. Maintaining Information Quality
          </h2>

          <p>
            We aim to ensure that information stored in the application is
            accurate, complete and up-to-date. Administrators are responsible
            for maintaining user account information, while coaches are
            responsible for creating, managing and updating team information,
            player jersey numbers and substitution records.
          </p>
        </section>

        {/* Policy Updates */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            11. Policy Updates
          </h2>

          <p>
            This Privacy Policy may be updated when changes are made to the
            application or its data handling practices. The latest version will
            be accessible through the Privacy Policy link on the Login page.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-3">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            12. Privacy Enquiries and Complaints
          </h2>

          <p className="leading-7 text-gray-600">
            For questions, access requests or complaints regarding this Privacy
            Policy, please contact the designated privacy representative.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Organisation: [Confirm responsible organisation]
          </p>

          <p className="leading-7 text-gray-600">
            Email: [Insert official contact email]
          </p>
          <p className="leading-7 text-gray-600">
            Website:{" "}
            <a
              href="https://www.raptors.org.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.raptors.org.au
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
