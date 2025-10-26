'use client';
import {
  motion,
  AnimatePresence,
  Transition,
  Variants,
  Variant,
  MotionConfig,
} from 'motion/react';
import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AccordionContextType = {
  expandedValue: React.Key | null;
  toggleItem: (value: React.Key) => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
}

export type AccordionProviderProps = {
  children: ReactNode;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: React.Key | null;
  onValueChange?: (value: React.Key | null) => void;
};

function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  onValueChange,
}: AccordionProviderProps) {
  const [internalExpandedValue, setInternalExpandedValue] =
    useState<React.Key | null>(null);

  const expandedValue =
    externalExpandedValue !== undefined
      ? externalExpandedValue
      : internalExpandedValue;

  const toggleItem = (value: React.Key) => {
    const newValue = expandedValue === value ? null : value;
    console.log(`toggleItem: current=${expandedValue}, new=${newValue}`);
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalExpandedValue(newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ expandedValue, toggleItem, variants }}>
      {children}
    </AccordionContext.Provider>
  );
}

export type AccordionProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: React.Key | null;
  onValueChange?: (value: React.Key | null) => void;
};

function Accordion({
  children,
  className,
  transition,
  variants,
  expandedValue,
  onValueChange,
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn('relative', className)} aria-orientation="vertical">
        <AccordionProvider
          variants={variants}
          expandedValue={expandedValue}
          onValueChange={onValueChange}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  );
}

export type AccordionItemProps = {
  value: React.Key;
  children: ReactNode;
  className?: string;
};

function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { expandedValue } = useAccordion();
  const isExpanded = value === expandedValue;

  return (
    <div
      className={cn('overflow-hidden', className)}
      {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childProps = typeof child.props === 'object' && child.props !== null ? child.props : {};
          return React.cloneElement(child, {
            ...childProps,
            value,
            expanded: isExpanded,
          });
        }
        return child;
      })}
    </div>
  );
}

export type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
  value?: React.Key; // Added
};

function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordion();
  const value = (props as { value?: React.Key }).value;
  const isExpanded = value === expandedValue;

  console.log(`AccordionTrigger: value=${value}, isExpanded=${isExpanded}`);

  return (
    <button
      onClick={() => value !== undefined && toggleItem(value)}
      aria-expanded={isExpanded}
      type="button"
      className={cn('group', className)}
      {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
    >
      {children}
    </button>
  );
}

export type AccordionContentProps = {
  children: ReactNode;
  className?: string;
  value?: React.Key; // Added
};

function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { expandedValue, variants } = useAccordion();
  const value = (props as { value?: React.Key }).value;
  const isExpanded = value === expandedValue;

  console.log(`AccordionContent: value=${value}, isExpanded=${isExpanded}`);

  const BASE_VARIANTS: Variants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  };

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={combinedVariants}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={className}
          {...(isExpanded ? { 'data-state': 'open' } : { 'data-state': 'closed' })}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };