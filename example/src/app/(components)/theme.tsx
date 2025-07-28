import { cn } from '@/helpers/utils';
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

// Color Preview Component
const ColorPreview: React.FC<{
  title: string;
  className: string;
  textClassName?: string;
}> = ({ title, className, textClassName = 'text-foreground' }) => (
  <View
    className={cn(
      'h-20 w-full border border-border rounded-lg flex items-center justify-center',
      className
    )}
  >
    <Text className={cn('font-medium mb-1', textClassName)}>{title}</Text>
  </View>
);

// Border Radius Preview Component
const BorderRadiusPreview: React.FC<{ title: string; radiusClass: string }> = ({
  title,
  radiusClass,
}) => (
  <View className="mb-2">
    <Text className="font-medium mb-1 text-foreground">{title}</Text>
    <View
      className={cn(
        'h-28 w-full bg-accent flex items-center justify-center',
        radiusClass
      )}
    >
      <Text className="text-accent-foreground">{title}</Text>
    </View>
  </View>
);

// Section Component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View className="mb-6">
    <Text className="text-lg font-bold mb-3 text-foreground">{title}</Text>
    <View className="gap-5">{children}</View>
  </View>
);

export default function Theme() {
  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Section title="Base Colors">
        <ColorPreview
          title="Background / Foreground"
          className="bg-background"
          textClassName="text-foreground"
        />
        <ColorPreview title="Panel" className="bg-panel" />
        <ColorPreview
          title="Muted"
          className="bg-muted"
          textClassName="text-muted-foreground"
        />
        <ColorPreview
          title="Surface"
          className="bg-surface"
          textClassName="text-surface-foreground"
        />
        <ColorPreview
          title="Base"
          className="bg-default"
          textClassName="text-default-foreground"
        />
        <ColorPreview
          title="Accent"
          className="bg-accent"
          textClassName="text-accent-foreground"
        />
        <ColorPreview
          title="Accent Soft"
          className="bg-accent-soft"
          textClassName="text-accent-soft-foreground"
        />
      </Section>
      <Section title="Status Colors">
        <ColorPreview
          title="Success"
          className="bg-success"
          textClassName="text-success-foreground"
        />
        <ColorPreview
          title="Warning"
          className="bg-warning"
          textClassName="text-warning-foreground"
        />
        <ColorPreview
          title="Danger"
          className="bg-danger"
          textClassName="text-danger-foreground"
        />
      </Section>
      <Section title="Misc Colors">
        <ColorPreview
          title="Border color"
          className="border-4 border-border bg-background"
        />
        <View className="mb-2">
          <Text className="text-sm font-medium mb-1 text-foreground">
            Link Color
          </Text>
          <Text className="text-link underline">This is a sample link</Text>
        </View>
      </Section>
      <Section title="Border Radius">
        <BorderRadiusPreview
          title="Extra Small (xs)"
          radiusClass="rounded-xs"
        />
        <BorderRadiusPreview title="Small (sm)" radiusClass="rounded-sm" />
        <BorderRadiusPreview title="Medium (md)" radiusClass="rounded-md" />
        <BorderRadiusPreview title="Large (lg)" radiusClass="rounded-lg" />
        <BorderRadiusPreview
          title="Extra Large (xl)"
          radiusClass="rounded-xl"
        />
        <BorderRadiusPreview title="2X Large (2xl)" radiusClass="rounded-2xl" />
        <BorderRadiusPreview title="3X Large (3xl)" radiusClass="rounded-3xl" />
        <BorderRadiusPreview title="4X Large (4xl)" radiusClass="rounded-4xl" />
      </Section>
    </ScrollView>
  );
}
