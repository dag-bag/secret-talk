"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Globe, Search, User, Plus } from "lucide-react";

const languageGroups = [
  {
    id: 1,
    name: "Spanish Speakers",
    members: 1200,
    languages: ["Spanish", "English"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    name: "Mandarin Exchange",
    members: 800,
    languages: ["Mandarin", "English"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    name: "Français & Friends",
    members: 650,
    languages: ["French", "English", "Spanish"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 4,
    name: "Deutsch Dialogue",
    members: 450,
    languages: ["German", "English"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 5,
    name: "日本語 Chat",
    members: 700,
    languages: ["Japanese", "English"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 6,
    name: "Polyglot Paradise",
    members: 1500,
    languages: ["English", "Spanish", "French", "German", "Italian"],
    image: "/placeholder.svg?height=100&width=200",
  },
];

export function MultilingualConnectComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(languageGroups);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = languageGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(term) ||
        group.languages.some((lang) => lang.toLowerCase().includes(term))
    );
    setFilteredGroups(filtered);
  };

  const handleCreateGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the creation of a new group
    // For now, we'll just close the modal
    setIsCreateGroupOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Globe className="h-6 w-6" />
            <h1 className="text-2xl font-bold">LinguaConnect</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Dialog
              open={isCreateGroupOpen}
              onOpenChange={setIsCreateGroupOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateGroup}>
                  <DialogHeader>
                    <DialogTitle>Create a New Language Group</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new language group.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="group-name" className="text-right">
                        Group Name
                      </Label>
                      <Input id="group-name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="languages" className="text-right">
                        Languages
                      </Label>
                      <Input id="languages" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Group</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" /> Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Login</DropdownMenuItem>
                <DropdownMenuItem>Sign Up</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for language groups..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.members} members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.languages.map((lang) => (
                    <Badge key={lang} variant="secondary">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Group</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2023 LinguaConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
