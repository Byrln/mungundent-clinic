declare module '@radix-ui/react-tabs' {
  import * as React from 'react';

  type PrimitiveDivProps = React.HTMLAttributes<HTMLDivElement>;
  type PrimitiveButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

  interface TabsProps extends PrimitiveDivProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    dir?: 'ltr' | 'rtl';
    activationMode?: 'automatic' | 'manual';
  }

  interface TabsListProps extends PrimitiveDivProps {
    loop?: boolean;
  }

  interface TabsTriggerProps extends PrimitiveButtonProps {
    value: string;
  }

  interface TabsContentProps extends PrimitiveDivProps {
    value: string;
    forceMount?: true;
  }

  const Root: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
  const List: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
  const Trigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  const Content: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;

  export {
    Root,
    List,
    Trigger,
    Content,
    Root as Tabs,
    List as TabsList,
    Trigger as TabsTrigger,
    Content as TabsContent,
  };
}