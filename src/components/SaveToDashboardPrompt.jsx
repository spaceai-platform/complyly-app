import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default function SaveToDashboardPrompt({ open, onOpenChange, onSave, contractName }) {
  const [saveOriginalFile, setSaveOriginalFile] = useState(false);

  const handleSave = () => {
    onSave(saveOriginalFile);
  };

  const handleNotNow = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Save this to your dashboard?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Access this explanation anytime across your devices.
          </p>

          <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <Checkbox
              id="saveOriginal"
              checked={saveOriginalFile}
              onCheckedChange={setSaveOriginalFile}
            />
            <div className="flex-1">
              <Label htmlFor="saveOriginal" className="text-sm font-medium cursor-pointer">
                Also store original file
              </Label>
              <p className="text-xs text-gray-600 mt-1 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                Not recommended for sensitive documents
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="outline" onClick={handleNotNow}>
            Not now
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}