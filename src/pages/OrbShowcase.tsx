import React, { useState, useEffect } from 'react';
import { Component as OrbComponent } from '@/components/ui/orb';
import { FloatingNavDemo } from '@/components/FloatingNavDemo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { GRADIENT_COLORS, ANIMATION_CONFIG } from '@/lib/gradient-constants';

const OrbShowcase = () => {
  const [hue, setHue] = useState([270]);
  const [hoverIntensity, setHoverIntensity] = useState([0.8]);
  const [rotateOnHover, setRotateOnHover] = useState(true);
  const [forceHoverState, setForceHoverState] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground 
        Breathing={true}
        startingGap={ANIMATION_CONFIG.BREATHING.startingGap}
        breathingRange={8} // Reduced for orb demo
        animationSpeed={0.008} // Slower for orb demo
        topOffset={ANIMATION_CONFIG.BREATHING.topOffset}
        gradientColors={GRADIENT_COLORS.BACKGROUND}
        gradientStops={GRADIENT_COLORS.STOPS}
      />

      {/* Floating Navigation - Always Visible with Proper Spacing */}
      <div className="fixed top-4 left-0 right-0 z-[9999] pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingNavDemo waitForIntro={false} alwaysVisible={true} />
        </div>
      </div>
      
      {/* Main Orb Display */}
      <div className="relative w-full h-screen">
        <OrbComponent
          hue={hue[0]}
          hoverIntensity={hoverIntensity[0]}
          rotateOnHover={rotateOnHover}
          forceHoverState={forceHoverState}
        />
        
        {/* Overlay Content - Responsive with proper top margin */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 lg:p-8 pt-28 sm:pt-32">
          {/* Header - Responsive */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 drop-shadow-2xl">
              Interactive Orb
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 drop-shadow-lg">
              Mouse-responsive WebGL animation powered by OGL
            </p>
          </div>

          {/* Controls Panel - Responsive */}
          <Card className="bg-black/40 backdrop-blur-md border-gray-700/50 max-w-sm sm:max-w-md mx-auto w-full">
            <CardHeader>
              <CardTitle className="text-white">Orb Controls</CardTitle>
              <CardDescription className="text-gray-300">{/* Changed to lighter gray */}
                Customize the orb's appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hue Control */}
              <div className="space-y-2">
                <Label className="text-white">Hue: {hue[0]}°</Label>
                <Slider
                  value={hue}
                  onValueChange={setHue}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Hover Intensity Control */}
              <div className="space-y-2">
                <Label className="text-white">Hover Intensity: {hoverIntensity[0].toFixed(2)}</Label>
                <Slider
                  value={hoverIntensity}
                  onValueChange={setHoverIntensity}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Toggle Controls */}
              <div className="flex items-center justify-between">
                <Label className="text-white">Rotate on Hover</Label>
                <Switch
                  checked={rotateOnHover}
                  onCheckedChange={setRotateOnHover}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-white">Force Hover State</Label>
                <Switch
                  checked={forceHoverState}
                  onCheckedChange={setForceHoverState}
                />
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHue([270]);
                    setHoverIntensity([0.6]);
                    setRotateOnHover(true);
                    setForceHoverState(false);
                  }}
                  className="bg-purple-600/20 border-purple-400 text-white hover:bg-purple-600/40"
                >
                  Purple
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHue([200]);
                    setHoverIntensity([0.8]);
                    setRotateOnHover(true);
                    setForceHoverState(false);
                  }}
                  className="bg-blue-600/20 border-blue-400 text-white hover:bg-blue-600/40"
                >
                  Blue
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHue([120]);
                    setHoverIntensity([1.0]);
                    setRotateOnHover(false);
                    setForceHoverState(true);
                  }}
                  className="bg-green-600/20 border-green-400 text-white hover:bg-green-600/40"
                >
                  Green
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHue([30]);
                    setHoverIntensity([1.2]);
                    setRotateOnHover(true);
                    setForceHoverState(false);
                  }}
                  className="bg-orange-600/20 border-orange-400 text-white hover:bg-orange-600/40"
                >
                  Orange
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="text-center text-gray-400">
            <p className="text-lg">Move your mouse around the orb to see the interactive effects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbShowcase;
