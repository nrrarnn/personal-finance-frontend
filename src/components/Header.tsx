import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: string[] = [
    "Home",
    "Features",
    "Customers",
    "FAQ"
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="py-4 px-6 bg-transparent fixed">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-extrabold text-xl text-slate-800">SaldaQ</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-5" justify="center"> 
          {
            menuItems.map((item, index) => (
              <NavbarItem key={index}>
                <Link color="foreground" href={`/${item.toLowerCase()}`}>
                  {item}
                </Link>
              </NavbarItem>
            ))
          }
          
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex font-semibold">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className="font-semibold bg-slate-800 text-white" color="default" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full text-slate-800"
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
