import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Upload, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DocumentListItem from "../components/DocumentListItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [renameDialog, setRenameDialog] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [newName, setNewName] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => base44.auth.me()
  });

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const currentUser = await base44.auth.me();
      return base44.entities.Contract.filter(
        { created_by: currentUser.email, status: "completed" },
        "-updated_date"
      );
    },
    enabled: !!user
  });

  const renameMutation = useMutation({
    mutationFn: ({ id, name }) => base44.entities.Contract.update(id, { contract_name: name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      setRenameDialog(null);
      setNewName("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Contract.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      setDeleteDialog(null);
    }
  });

  const handleRename = (document) => {
    setRenameDialog(document);
    setNewName(document.contract_name);
  };

  const handleDelete = (document) => {
    setDeleteDialog(document);
  };

  const confirmRename = () => {
    if (newName.trim()) {
      renameMutation.mutate({ id: renameDialog.id, name: newName.trim() });
    }
  };

  const confirmDelete = () => {
    deleteMutation.mutate(deleteDialog.id);
  };

  const filters = [
    { value: "all", label: "All" },
    { value: "employment", label: "Work" },
    { value: "financial", label: "Financial" },
    { value: "business", label: "Business" },
    { value: "policy", label: "Policy" },
    { value: "technical", label: "Technical" }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.contract_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || doc.document_type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">Complyly™</span>
          </Link>
          <Link to={createPageUrl("Upload")}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              New scan
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-gray-600">Search and manage your saved documents</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search documents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedFilter === filter.value ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.value)}
              className={selectedFilter === filter.value ? "bg-blue-600" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Documents List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading documents...</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Save a report to access it later across devices"}
              </p>
              <Link to={createPageUrl("Upload")}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  New scan
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <DocumentListItem
                key={doc.id}
                document={doc}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Rename Dialog */}
      <Dialog open={!!renameDialog} onOpenChange={() => setRenameDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="newName">Document name</Label>
              <Input
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && confirmRename()}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialog(null)}>
              Cancel
            </Button>
            <Button onClick={confirmRename} disabled={!newName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete document?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 py-4">
            This will permanently remove "{deleteDialog?.contract_name}" from your dashboard.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(null)}>
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}