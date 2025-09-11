import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "이메일",
      value: "zxcv0516zz@gmail.com",
      action: "mailto:zxcv0516zz@gmail.com"
    },
    {
      icon: Phone,
      title: "전화",
      value: "+82 10-1234-5678",
      action: "tel:+821012345678"
    },
    {
      icon: MapPin,
      title: "위치",
      value: "서울, 대한민국",
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      title: "GitHub",
      url: "https://github.com/kimsungbo1593",
      color: "hover:text-purple-400"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">연락하기</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            새로운 프로젝트나 협업 기회에 대해 이야기해보세요!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">연락 방법</h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{method.title}</p>
                    {method.action ? (
                      <a
                        href={method.action}
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{method.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Social Links */}
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">소셜 미디어</h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-16 transition-spring hover:shadow-glow"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4"
                  >
                    <social.icon className={`h-6 w-6 ${social.color} transition-smooth`} />
                    <span className="text-lg">{social.title}</span>
                  </a>
                </Button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Button className="w-full shadow-glow" size="lg" asChild>
                <a href="mailto:zxcv0516zz@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  이메일 보내기
                </a>
              </Button>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">함께 멋진 것을 만들어보세요!</h3>
            <p className="text-muted-foreground mb-6">
              새로운 아이디어나 프로젝트가 있으시면 언제든 연락해주세요. 
              함께 혁신적인 솔루션을 만들어나가고 싶습니다.
            </p>
            <Button size="lg" className="shadow-glow">
              프로젝트 시작하기
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;