import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Zap, Heart } from "lucide-react";

const AboutSection = () => {
  const skills = [
    { icon: Code, title: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS"] },
    { icon: Zap, title: "Backend", skills: ["Node.js", "Python"] },
    { icon: Palette, title: "Design", skills: ["Figma", "UI/UX", "Responsive Design"] },
    { icon: Heart, title: "Tools", skills: ["Git", "Docker"] },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            끊임없이 학습하고 성장하는 개발자입니다. 새로운 기술을 배우고 적용하는 것을 즐깁니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((category, index) => (
            <Card key={index} className="glass-card p-6 transition-spring hover:shadow-glow hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <category.icon className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="mr-2 mb-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;