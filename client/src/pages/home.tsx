import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertPledgeSchema, type InsertPledge } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Factory, Thermometer, Wind, TreePine, Recycle, ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/Earth_from_space_hero_3c00e172.png";
import factoryIcon from "@assets/generated_images/Factory_emissions_icon_a5909db0.png";
import deforestationIcon from "@assets/generated_images/Deforestation_icon_22769032.png";
import temperatureIcon from "@assets/generated_images/Rising_temperature_icon_80989338.png";
import cleanEnergyIcon from "@assets/generated_images/Clean_energy_icon_1cdcebfa.png";
import treePlantingIcon from "@assets/generated_images/Tree_planting_icon_ecc7ddb3.png";
import forestBefore from "@assets/generated_images/Healthy_forest_before_483bb11c.png";
import forestAfter from "@assets/generated_images/Deforested_land_after_0885a9bd.png";
import glacierBefore from "@assets/generated_images/Glacier_before_melting_b71b52e2.png";
import glacierAfter from "@assets/generated_images/Glacier_after_melting_20ad5479.png";
import BeforeAfterSlider from "@/components/before-after-slider";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const { toast } = useToast();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const form = useForm<InsertPledge>({
    resolver: zodResolver(insertPledgeSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const pledgeMutation = useMutation({
    mutationFn: async (data: InsertPledge) => {
      return await apiRequest("POST", "/api/pledges", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank You!",
        description: "Your climate action pledge has been received. Together, we can make a difference!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit pledge. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPledge) => {
    pledgeMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    const fadeElements = document.querySelectorAll(".fade-in-on-scroll");
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      fadeObserver.disconnect();
    };
  }, []);

  const actions = [
    { id: "reduce-waste", label: "Reduce waste and recycle more", icon: Recycle },
    { id: "clean-energy", label: "Use clean, renewable energy", icon: Wind },
    { id: "plant-trees", label: "Plant trees and support reforestation", icon: TreePine },
    { id: "conserve-water", label: "Conserve water and protect resources", icon: Leaf },
  ];

  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});

  const toggleAction = (actionId: string) => {
    setCheckedActions((prev) => ({
      ...prev,
      [actionId]: !prev[actionId],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        .fade-in-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">Act for Earth</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {[
                { id: "home", label: "Home" },
                { id: "causes", label: "Causes" },
                { id: "effects", label: "Effects" },
                { id: "actions", label: "Take Action" },
                { id: "pledge", label: "Pledge" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  data-testid={`link-${item.id}`}
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    activeSection === item.id ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
            Act for Earth
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
            Climate Action for a Sustainable Future
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Our planet is facing an unprecedented climate crisis. Rising temperatures, melting ice caps,
            and extreme weather threaten life as we know it. But together, we can make a difference.
            Learn about climate change and take action today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("actions")}
              data-testid="button-get-started"
              className="bg-primary/90 backdrop-blur-sm border border-primary-border text-lg"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("causes")}
              data-testid="button-learn-more"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white text-lg"
            >
              Learn More
            </Button>
          </div>
          
          <button
            onClick={() => scrollToSection("causes")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
            data-testid="button-scroll-down"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      <section id="causes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Causes of Climate Change
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Understanding what drives global warming is the first step toward solving it
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="fade-in-on-scroll" data-testid="card-cause-emissions">
              <CardHeader>
                <div className="w-20 h-20 mb-4 rounded-lg overflow-hidden">
                  <img src={factoryIcon} alt="Factory emissions" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl">Greenhouse Gas Emissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Burning fossil fuels for energy, transportation, and industry releases massive amounts
                  of CO₂ and other greenhouse gases, trapping heat in our atmosphere and warming the planet.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in-on-scroll" style={{ transitionDelay: "0.2s" }} data-testid="card-cause-deforestation">
              <CardHeader>
                <div className="w-20 h-20 mb-4 rounded-lg overflow-hidden">
                  <img src={deforestationIcon} alt="Deforestation" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl">Deforestation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cutting down forests destroys nature's carbon sinks. Trees absorb CO₂, but when forests
                  are cleared, stored carbon is released and our planet loses its natural defense against warming.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in-on-scroll" style={{ transitionDelay: "0.4s" }} data-testid="card-cause-temperature">
              <CardHeader>
                <div className="w-20 h-20 mb-4 rounded-lg overflow-hidden">
                  <img src={temperatureIcon} alt="Rising temperature" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="text-2xl">Rising Global Temperatures</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The Earth's average temperature has risen by over 1°C since pre-industrial times. This
                  seemingly small change has dramatic effects on weather patterns, ecosystems, and sea levels.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in-on-scroll" style={{ transitionDelay: "0.6s" }} data-testid="card-cause-industrial">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="w-12 h-12 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">Industrial Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manufacturing, agriculture, and other industrial processes emit methane and nitrous oxide,
                  powerful greenhouse gases that accelerate climate change and environmental degradation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="effects" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Effects on Our Planet
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            See the devastating impact of climate change through before and after comparisons
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="fade-in-on-scroll">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Deforestation Impact</h3>
              <p className="text-muted-foreground mb-6">
                Healthy forests are being destroyed at an alarming rate, releasing stored carbon and
                destroying habitats for countless species.
              </p>
              <BeforeAfterSlider
                beforeImage={forestBefore}
                afterImage={forestAfter}
                beforeLabel="Thriving Forest"
                afterLabel="After Deforestation"
              />
            </div>

            <div className="fade-in-on-scroll" style={{ transitionDelay: "0.3s" }}>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Melting Glaciers</h3>
              <p className="text-muted-foreground mb-6">
                Polar ice and glaciers are melting at unprecedented rates, contributing to rising sea
                levels and threatening coastal communities worldwide.
              </p>
              <BeforeAfterSlider
                beforeImage={glacierBefore}
                afterImage={glacierAfter}
                beforeLabel="Intact Glacier"
                afterLabel="After Melting"
              />
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <Card className="fade-in-on-scroll" data-testid="card-effect-temperature">
              <CardHeader>
                <Thermometer className="w-10 h-10 text-destructive mb-2" />
                <CardTitle>Rising Temperatures</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Heat waves are becoming more frequent and intense, endangering human health and agriculture.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in-on-scroll" style={{ transitionDelay: "0.2s" }} data-testid="card-effect-weather">
              <CardHeader>
                <Wind className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Extreme Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hurricanes, droughts, and floods are intensifying, causing devastating damage worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in-on-scroll" style={{ transitionDelay: "0.4s" }} data-testid="card-effect-biodiversity">
              <CardHeader>
                <TreePine className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Biodiversity Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ecosystems are collapsing, with species going extinct at an unprecedented rate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="actions" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            How You Can Help
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Every action counts. Check off the steps you're ready to take to fight climate change
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {actions.map((action, index) => {
              const Icon = action.icon;
              const isChecked = checkedActions[action.id];
              return (
                <Card
                  key={action.id}
                  className={`fade-in-on-scroll transition-all duration-300 cursor-pointer ${
                    isChecked ? "border-primary bg-primary/5" : ""
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onClick={() => toggleAction(action.id)}
                  data-testid={`card-action-${action.id}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={isChecked}
                        data-testid={`checkbox-${action.id}`}
                        className="w-6 h-6 pointer-events-none"
                      />
                      <Icon className={`w-8 h-8 ${isChecked ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-lg font-medium flex-1 ${isChecked ? "text-primary" : "text-foreground"}`}>
                        {action.label}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              {Object.values(checkedActions).filter(Boolean).length} of {actions.length} actions completed
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("pledge")}
              data-testid="button-make-pledge"
            >
              Make Your Climate Pledge
            </Button>
          </div>
        </div>
      </section>

      <section id="pledge" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Take the Climate Pledge
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of people committed to climate action. Share your pledge and inspire others
          </p>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Climate Pledge</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your commitment to fighting climate change..."
                            className="min-h-32"
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={pledgeMutation.isPending}
                    data-testid="button-submit-pledge"
                  >
                    {pledgeMutation.isPending ? "Submitting..." : "Submit My Pledge"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6" />
            <span className="font-bold text-lg">Act for Earth</span>
          </div>
          <p className="text-background/70 mb-2">
            Climate Action (SDG 13) — United Nations Sustainable Development Goals
          </p>
          <p className="text-background/60 text-sm">
            Together, we can build a sustainable future for all
          </p>
        </div>
      </footer>
    </div>
  );
}
