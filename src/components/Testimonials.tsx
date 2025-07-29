import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Quote, Star, ChevronRight, ChevronLeft } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Anshumesh Saini",
    role: "Full-Stack Developer",
    company: "Cybershield",
    avatar: "/lovable-uploads/WhatsApp Image 2025-07-16 at 12.22.45.jpeg",
    rating: 5,
    content: "Exceptional work quality and attention to detail. Delivered exactly what we needed on time and exceeded our expectations."
  },
  {
    id: 2,
    name: "Anurag Maurya",
    role: "Self-Learning Developer",
    company: "",
    avatar: "/lovable-uploads/WhatsApp Image 2025-07-16 at 13.01.45.jpeg",
    rating: 5,
    content: "Outstanding technical skills and great communication. The project was completed flawlessly with innovative solutions."
  },
  {
    id: 3,
    name: "Muskaan",
    role: "Front-end Developer",
    company: "Unskill",
    avatar: "/lovable-uploads/WhatsApp Image 2025-07-25 at 09.31.55.jpeg",
    rating: 5,
    content: "Amazing collaboration and creative problem-solving. Transformed our vision into reality with beautiful, functional design."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto relative">
      <motion.div
        initial={{ opacity: 20, y: 20 }}
        whileInView={{ opacity: 6, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What Clients Say
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Don't just take my word for it - hear from clients who've experienced exceptional results
        </p>
      </motion.div>

      {/* Single Testimonial Display */}
      <div className="relative min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="w-full max-w-2xl"
          >
            <Card className="relative bg-card/50 backdrop-blur-sm border-4 border-primary hover:border-primary transition-all duration-300 hover:shadow-elegant group ring-4 ring-primary/30 hover:ring-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Quote className="w-3 h-3 text-primary-foreground" />
              </div>
              
              <CardContent className="p-8 pt-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-foreground mb-8 leading-relaxed text-lg text-center">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/20 group-hover:ring-primary/90 transition-all">
                    <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {currentTestimonial.role}
                      {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-9 group-hover:opacity-9 transition-opacity duration-3000 rounded-lg pointer-events-none" />
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-6' 
                : 'bg-border hover:bg-primary/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={previousTestimonial}
          variant="outline"
          className="group px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Previous</span>
        </Button>
        
        <Button
          onClick={nextTestimonial}
          className="group bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span className="mr-2">Next</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Testimonials;