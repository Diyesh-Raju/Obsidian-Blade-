"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 300; 
    const radian = (angle * Math.PI) / 180;

    const x = Number((radius * Math.cos(radian) + centerOffset.x).toFixed(2));
    const y = Number((radius * Math.sin(radian) + centerOffset.y).toFixed(2));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Number((Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))).toFixed(2));

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-[#b76e79] border-[#b76e79]";
      case "in-progress":
        return "text-[#b76e79] bg-white border-[#b76e79]";
      case "pending":
        return "text-zinc-500 bg-zinc-100 border-zinc-200";
      default:
        return "text-zinc-500 bg-zinc-100 border-zinc-200";
    }
  };

  if (!isMounted) {
    return <div className="w-full h-[800px] bg-white"></div>;
  }

  return (
    <div
      className="w-full h-[800px] flex flex-col items-center justify-center bg-white overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* THE CORE */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#b76e79] via-[#e4a8b3] to-[#b76e79] animate-pulse flex items-center justify-center z-10 shadow-[0_0_40px_rgba(183,110,121,0.4)]">
            <div className="absolute w-32 h-32 rounded-full border border-[#b76e79]/30 animate-ping opacity-70"></div>
            <div
              className="absolute w-40 h-40 rounded-full border border-[#b76e79]/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md"></div>
          </div>

          {/* ORBIT RING */}
          <div className="absolute w-[600px] h-[600px] rounded-full border border-[#b76e79]/40 shadow-[0_0_30px_rgba(183,110,121,0.05)_inset]"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el: HTMLDivElement | null) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer flex flex-col items-center justify-center"
                style={nodeStyle}
                suppressHydrationWarning 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* NODE AURA: Base size increased to 80px and glow made much brighter (0.3 opacity) */}
                <div
                  className={`absolute rounded-full ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(183,110,121,0.3) 0%, rgba(183,110,121,0) 70%)`,
                    width: `${item.energy * 0.5 + 80}px`,
                    height: `${item.energy * 0.5 + 80}px`,
                    left: `-${(item.energy * 0.5) / 2}px`,
                    top: `-${(item.energy * 0.5) / 2}px`,
                  }}
                ></div>

                {/* THE NODE ITSELF: Scaled up to massive w-20 h-20 (80px) with custom radiant shadows */}
                <div
                  className={`
                  relative w-20 h-20 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#b76e79] text-white"
                      : isRelated
                      ? "bg-white text-[#b76e79]"
                      : "bg-white text-[#b76e79]" 
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-[#b76e79] shadow-[0_0_40px_rgba(183,110,121,0.8)]" // Super bright expanded glow
                      : isRelated
                      ? "border-[#b76e79] animate-pulse shadow-[0_0_20px_rgba(183,110,121,0.5)]"
                      : "border-[#b76e79]/60 shadow-[0_0_15px_rgba(183,110,121,0.4)]" // Brighter default glow
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-[1.25]" : "hover:scale-110 hover:border-[#b76e79] hover:shadow-[0_0_25px_rgba(183,110,121,0.6)]"}
                `}
                >
                  {/* Icon scaled up to 32px to match massive circle */}
                  <Icon size={32} />
                </div>

                {/* NODE LABEL: Pushed down further (top-24) to avoid overlapping the new massive node */}
                <div
                  className={`
                  absolute top-24 whitespace-nowrap left-1/2 -translate-x-1/2
                  text-sm font-medium tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-[#b76e79] scale-110 font-bold" : "text-[#b76e79]/90"}
                `}
                >
                  {item.title}
                </div>

                {/* EXPANDED CARD: Pushed down to top-32 so it doesn't clip the giant node */}
                {isExpanded && (
                  <Card className="absolute top-32 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl border-[#b76e79]/20 shadow-2xl shadow-[#b76e79]/10 overflow-visible">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[#b76e79]/30"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-[10px] uppercase tracking-wider ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status.replace("-", " ")}
                        </Badge>
                        <span className="text-xs font-mono text-zinc-400">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-base text-zinc-800 mt-3 font-medium">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-zinc-600 font-light leading-relaxed">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-4 border-t border-zinc-100">
                        <div className="flex justify-between items-center text-xs mb-2 text-zinc-500">
                          <span className="flex items-center uppercase tracking-wider text-[10px]">
                            <Zap size={12} className="mr-1 text-[#b76e79]" />
                            Resource Allocation
                          </span>
                          <span className="font-mono text-[#b76e79]">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#e4a8b3] to-[#b76e79] rounded-full"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-zinc-100">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-zinc-400 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-zinc-400">
                              Connected Phases
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-full border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-[#b76e79]/30 text-zinc-600 transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-1 text-[#b76e79]"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}