import { motion } from 'framer-motion';
import { Code, Palette, Rocket, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import profileHeadshot from '/lovable-uploads/bbadecdb-85bf-4a60-acd7-8e239aaabaea.png';

const About = () => {
  const skills = [
    { name: 'Frontend Development', percentage: 95 },
    { name: 'Backend Development', percentage: 88 },
     { name: 'Python', percentage: 82 },
    { name: 'Other', percentage: 75 },
  ];

  const techStack = [
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Language' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'GraphQL', category: 'API' },
    { name: 'Redis', category: 'Cache' },
    { name: 'HTML/CSS', category: 'Frontend' },
    { name: 'JavaScript', category: 'Backend' },
  ];

  const values = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code that stands the test of time.'
    },
    {
      icon: Palette,
      title: 'Design Thinking',
      description: 'Creating intuitive user experiences with attention to detail and aesthetic appeal.'
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Staying ahead of technology trends and implementing cutting-edge solutions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively with cross-functional teams to deliver exceptional results.'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="bg-gradient-button bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate developer with a love for creating digital experiences that make a difference
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image and Introduction */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative">
                <img
  src="/lovable-uploads/newwww.jpg"
  alt="About Kishan Singh"
  className="w-80 h-100 mx-auto rounded-2xl shadow-medium object-cover border-2 border-white/10"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
              </div>
            </motion.div>

            {/* Bio and Skills */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">
                  Hi there! I'm Kishan Singh
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a passionate Full Stack Developer with over <span className="text-accent font-bold">3+ years</span> of experience creating 
                    digital solutions that bridge the gap between design and technology. My journey 
                    started with a curiosity about how websites work, and it has evolved into a 
                    deep expertise in modern web technologies.
                  </p>
                  <p>
                    I specialize in React, Node.js, and cloud technologies, with a strong focus on 
                    user experience and performance optimization. When I'm not coding, you'll find me 
                    exploring new technologies, contributing to open source projects, or mentoring 
                    aspiring developers.
                  </p>
                  <p>
                    I believe in the power of clean code, thoughtful design, and continuous learning 
                    to create solutions that not only work well but also inspire and delight users.
                  </p>
                </div>
              </div>

              {/* Skills Bars */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-foreground">Core Skills</h4>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                          className="h-full bg-gradient-button rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-border hover:border-accent/50 transition-all duration-300 hover:shadow-medium">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-card rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                        <span className="text-lg font-semibold text-accent">
                          {tech.name.charAt(0)}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground text-sm">{tech.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{tech.category}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-foreground text-center mb-12">
              What Drives Me
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-border hover:border-accent/50 transition-all duration-300 hover:shadow-medium">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-card rounded-full flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                        <value.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h4 className="font-semibold text-foreground">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;