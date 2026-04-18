'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { LucideIcon, GlobeIcon, LayersIcon, UserPlusIcon, BarChart, PlugIcon, CodeIcon, Users, Star, Handshake, FileText, Shield, RotateCcw, Leaf, HelpCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

/** * Type Definitions 
 */
type LinkItem = {
    title: string;
    href: string;
    description?: string;
    icon: LucideIcon;
};

/** * Main Header Component 
 */
export function Header() {
    const [open, setOpen] = useState(false);
    const scrolled = useScroll(10);

    // Prevent scrolling when mobile menu is active
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
                scrolled && 'bg-background/95 border-border backdrop-blur-lg supports-[backdrop-filter]:bg-background/50'
            )}
        >
            <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
                {/* Logo & Desktop Nav */}
                <div className="flex items-center gap-6">
                    <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="text-xl font-bold tracking-tighter text-foreground">RMCL</span>
                    </a>

                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {/* Product Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">Product</NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-background p-1 pr-1.5 shadow-xl border">
                                    <ul className="grid w-[500px] grid-cols-2 gap-2 p-3">
                                        {productLinks.map((item) => (
                                            <li key={item.title}>
                                                <ListItem {...item} />
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="p-3 border-t bg-muted/20">
                                        <p className="text-muted-foreground text-sm">
                                            Ready to transform your data?{' '}
                                            <a href="#" className="text-foreground font-semibold hover:underline">
                                                Schedule a demo
                                            </a>
                                        </p>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* Company Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-background p-1 shadow-xl border">
                                    <div className="grid w-[500px] grid-cols-2 gap-4 p-3">
                                        <ul className="space-y-1">
                                            {companyLinks.map((item) => (
                                                <li key={item.title}>
                                                    <ListItem {...item} />
                                                </li>
                                            ))}
                                        </ul>
                                        <ul className="space-y-1 bg-muted/10 rounded-lg p-2">
                                            {companyLinks2.map((item) => (
                                                <li key={item.title}>
                                                    <NavigationMenuLink
                                                        href={item.href}
                                                        className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                                                    >
                                                        <item.icon className="size-4 text-muted-foreground" />
                                                        <span className="text-sm font-medium">{item.title}</span>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuLink href="#" className="px-4 text-sm font-medium hover:text-primary transition-colors">
                                Pricing
                            </NavigationMenuLink>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <Button variant="ghost" size="sm">Sign In</Button>
                    <Button size="sm">Get Started</Button>
                </div>

                {/* Mobile Toggle */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="md:hidden border-none hover:bg-transparent"
                    aria-label="Toggle Menu"
                >
                    <MenuToggleIcon open={open} className="size-6" duration={300} />
                </Button>
            </nav>

            <MobileMenu open={open} className="flex flex-col justify-between p-6">
                <div className="space-y-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Product</p>
                        {productLinks.map((link) => <ListItem key={link.title} {...link} />)}
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Company</p>
                        {companyLinks.map((link) => <ListItem key={link.title} {...link} />)}
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-auto pt-6 border-t">
                    <Button variant="outline" className="w-full">Sign In</Button>
                    <Button className="w-full">Get Started</Button>
                </div>
            </MobileMenu>
        </header>
    );
}

/** * Helper Components 
 */
function ListItem({ title, description, icon: Icon, href }: LinkItem) {
    return (
        <NavigationMenuLink asChild>
            <a
                href={href}
                className="group flex flex-row gap-3 rounded-md p-2 hover:bg-accent transition-all duration-200"
            >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background shadow-sm group-hover:bg-primary/5">
                    <Icon className="size-5 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-sm font-semibold leading-none mb-1">{title}</span>
                    {description && <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>}
                </div>
            </a>
        </NavigationMenuLink>
    );
}

function MobileMenu({ open, children, className }: { open: boolean; children: React.ReactNode; className?: string }) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-md md:hidden animate-in fade-in duration-200">
            <div className={cn('h-full w-full overflow-y-auto bg-background p-4 shadow-xl', className)}>
                {children}
            </div>
        </div>,
        document.body
    );
}

/** * Custom Hooks 
 */
function useScroll(threshold: number) {
    const [scrolled, setScrolled] = useState(false);
    const onScroll = useCallback(() => setScrolled(window.scrollY > threshold), [threshold]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    return scrolled;
}

/** * Navigation Data 
 */
const productLinks: LinkItem[] = [
    { title: 'Website Builder', href: '#', description: 'Create responsive sites', icon: GlobeIcon },
    { title: 'Cloud Platform', href: '#', description: 'Scale apps easily', icon: LayersIcon },
    { title: 'Analytics', href: '#', description: 'Track your traffic', icon: BarChart },
    { title: 'API', href: '#', description: 'Custom integrations', icon: CodeIcon },
];

const companyLinks: LinkItem[] = [
    { title: 'About Us', href: '#', description: 'Our story and team', icon: Users },
    { title: 'Success Stories', href: '#', description: 'Client successes', icon: Star },
    { title: 'Partnerships', href: '#', description: 'Mutual growth', icon: Handshake },
];

const companyLinks2: LinkItem[] = [
    { title: 'Terms', href: '#', icon: FileText },
    { title: 'Privacy', href: '#', icon: Shield },
    { title: 'Help Center', href: '#', icon: HelpCircle },
];

