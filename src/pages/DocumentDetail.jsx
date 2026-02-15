import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Eye, GitCompare, Trash2, CheckCircle, X } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DocumentDetail() {
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("id");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const { data: contract, isLoading } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => base44.entities.Contract.get(contractId),
    enabled: !!contractId
  });

  const deleteMutation = useMutation({
    mutationFn: () => base44.entities.Contract.delete(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      navigate(createPageUrl("Documents"));
    }
  });

  const getDocumentTypeLabel = (type) => {
    const labels = {
      personal: "Personal agreement",
      employment: "Work or employment terms",
      financial: "Financial or loan document",
      business: "Business or commercial agreement",
      policy: "Policy or regulatory document",
      technical: "Technical or IT document",
      other: "Other document"
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Document not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("Documents")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </Link>
          <Link to={createPageUrl("Home")}>
            <span className="text-2xl font-bold text-blue-600">Complyly™</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{contract.contract_name}</h1>
        </div>

        {/* Document Summary */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Document Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">{getDocumentTypeLabel(contract.document_type)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Added on</span>
                <span className="font-medium">{format(new Date(contract.created_date), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Saved</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Yes
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link to={createPageUrl("Analysis") + `?id=${contract.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View explanation
                </Button>
              </Link>
              <Link to={createPageUrl("CompareDocuments") + `?id=${contract.id}`}>
                <Button variant="outline">
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Storage Info */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Saved content</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Report saved</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Yes
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Original file saved</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                  <X className="w-3 h-3 mr-1" />
                  No
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete document?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 py-4">
            This will permanently remove "{contract.contract_name}" from your dashboard.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => deleteMutation.mutate()}
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