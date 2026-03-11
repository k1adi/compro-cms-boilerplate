import { usePage } from "@inertiajs/react";
import NavLink from "./NavLink";
import {
  Bug,
  LayoutDashboard,
  MessagesSquare,
  Newspaper,
  Tags,
} from "lucide-react";

export default function NavMenu() {
  const { url: inertiaUrl } = usePage();
  const urlPath = inertiaUrl.split("/");

  return (
    <nav className="cms-nav">
      <ul className="cms-nav__list top">
        {/* Dashboard */}
        <NavLink
          link={route("cms.dashboard")}
          icon={<LayoutDashboard />}
          name="dashboard"
          text="Dashboard"
          active={urlPath[1] === "cms" && urlPath.length === 2}
        />

        {/* Article */}
        <NavLink
          link={route("cms.articles.index")}
          icon={<Newspaper />}
          name="article"
          text="Article"
          active={(urlPath[1] === "cms" && urlPath[2] ? urlPath[2] : urlPath[1]).includes("articles")}
        />

        {/* Category & tags */}
        <NavLink
          link={route("cms.categories.index")}
          icon={<Tags />}
          name="category"
          text="Category & Tags"
          active={(urlPath[1] === "cms" && urlPath[2] ? urlPath[2] : urlPath[1]).includes("categories")}
        />

        {/* FAQ */}
        <NavLink
          link={route("cms.faqs.index", { category: "all" })}
          icon={<MessagesSquare />}
          name="faq"
          text="FAQ"
          active={(urlPath[1] === "cms" && urlPath[2] ? urlPath[2] : urlPath[1]).includes("faqs")}
        />
      </ul>

      <ul className="cms-nav__list">
        <li>
          <a
            className="cms-nav__link"
            href="https://forms.gle/TdkZUmF8ay24trRL9"
            target="_blank"
          >
            <Bug /> Report Bug/Issues
          </a>
        </li>
      </ul>
    </nav>
  );
}
