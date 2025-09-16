export type Receipt = {
  id: string;
  uri: string;
  createdAtISO: string;
  note?: string;
};

export type ReceiptsContextType = {
  receipts: Receipt[];
  addFromCamera: () => Promise<boolean>;
  addFromLibrary: () => Promise<boolean>;
  remove: (id: string) => Promise<void>;
};

