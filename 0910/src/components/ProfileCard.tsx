import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import profileImage from "@/assets/profile-image-nature.jpg";

const ProfileCard = () => {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-glow"></div>
            <img
              src={profileImage}
              alt="프로필 사진"
              className="relative w-80 h-80 rounded-full object-cover shadow-elegant animate-float"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-6 animate-slide-up">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              안녕하세요, <span className="gradient-text">김성보</span>입니다
            </h1>
            <p className="text-2xl text-muted-foreground mb-6">
              풀스택 개발자
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              혁신적인 웹 애플리케이션을 만드는 것을 좋아합니다. 
              사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="px-3 py-1">React</Badge>
            <Badge variant="secondary" className="px-3 py-1">TypeScript</Badge>
            <Badge variant="secondary" className="px-3 py-1">Node.js</Badge>
            <Badge variant="secondary" className="px-3 py-1">Python</Badge>
            <Badge variant="secondary" className="px-3 py-1">AWS</Badge>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="glass-card" asChild>
              <a href="https://github.com/kimsungbo1593" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;