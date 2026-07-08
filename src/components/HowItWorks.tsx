import {
  Search,
  Scale,
  ShoppingCart
} from "lucide-react";

const steps = [
  {
    icon: <Search size={35} />,
    title: "Search",
    desc: "Find any camera lens or gear.",
  },
  {
    icon: <Scale size={35} />,
    title: "Compare",
    desc: "Compare prices across stores.",
  },
  {
    icon: <ShoppingCart size={35} />,
    title: "Buy Smart",
    desc: "Choose the best deal and save money.",
  },
];

const HowItWorks = () => {
  return (
    <section className="home-section">
      <div className="container">

        <h2 className="section-title text-center">
          How LensMarket Works
        </h2>

        <div className="how-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-icon">
                {step.icon}
              </div>

              <h3 className="step-title">
                {step.title}
              </h3>

              <p className="step-desc">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;