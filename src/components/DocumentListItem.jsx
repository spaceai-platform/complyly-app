import React, { useState } from "react";
import { FileText, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function DocumentListItem({ document, onRename, onDelete }) {
  const getDocumentTypeLabel = (type) => {
    const labels = {
      personal: "Personal",
      employment: "Work",
      financial: "Financial",
      business: "Business",
      policy: "Policy",
      technical: "Technical",
      other: "Other"
    };
    return labels[type] || type;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
      <Link 
        to={createPageUrl("DocumentDetail") + `?id=${document.id}`}
        className="flex items-center gap-4 flex-1 min-w-0"
      >
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {document.contract_name}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span>{getDocumentTypeLabel(document.document_type)}</span>
            <span>•</span>
            <span>{format(new Date(document.updated_date), "MMM d, yyyy")}</span>
          </div>
        </div>

        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Saved
        </Badge>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-2">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onRename(document)}>
            <Pencil className="w-4 h-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(document)}
            className="text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}