import React from "react";

interface Props {
  role?: "guest" | "student" | "teacher";
  active?: string;
}

const Navbar: React.FC<Props> = ({ role = "guest", active }) => {
  return (
    <div style={styles.nav}>
      {/* Logo */}
      <div style={styles.logo}>Vinternship</div>

      {/* Links */}
      <div style={styles.links}>
        {role === "guest" && (
          <>
            <NavItem label="Login" href="/login" active={active} />
            <NavItem label="Register" href="/register" active={active} />
          </>
        )}

        {role === "student" && (
          <>
            <NavItem label="Dashboard" href="/student" active={active} />
            <NavItem label="My Courses" href="/courses" active={active} />
            <NavItem label="Logout" href="/login" active={active} />
          </>
        )}

        {role === "teacher" && (
          <>
            <NavItem label="Dashboard" href="/teacher" active={active} />
            <NavItem label="Cohorts" href="/cohorts" active={active} />
            <NavItem label="Logout" href="/login" active={active} />
          </>
        )}
      </div>
    </div>
  );
};

const NavItem = ({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active?: string;
}) => {
  const isActive = active === label.toLowerCase();

  return (
    <a
      href={href}
      style={{
        ...styles.link,
        ...(isActive ? styles.active : {}),
      }}
    >
      {label}
    </a>
  );
};

const styles: any = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "72px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(71, 85, 105, 0.3)",
    zIndex: 1000,
  },

  logo: {
    fontSize: "24px",
    fontWeight: "900",
    background: "linear-gradient(135deg, #FFFFFF 0%, #A5B4FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },

  links: {
    display: "flex",
    gap: "18px",
  },

  link: {
    textDecoration: "none",
    color: "#CBD5E1",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px 16px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },

  active: {
    background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    color: "white",
    boxShadow: "0 6px 18px rgba(99, 102, 241, 0.4)",
  },
};

export default Navbar;