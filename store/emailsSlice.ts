import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Email, Message } from "@/data/emails";

interface ComposeEmail {
  to: string;
  subject: string;
  body: string;
}

interface EmailsState {
  emails: Email[];
  selectedEmail: Email | null;
  currentFolder: string;
  searchQuery: string;
  messages: { [emailId: number]: Message[] };
  isComposeOpen: boolean;
  composeEmail: ComposeEmail;
  drafts: Email[];
  editingDraftId: number | null;
}

const initialState: EmailsState = {
  emails: [],
  selectedEmail: null,
  currentFolder: "Inbox",
  searchQuery: "",
  messages: {},
  isComposeOpen: false,
  composeEmail: {
    to: "",
    subject: "",
    body: "",
  },
  drafts: [],
  editingDraftId: null,
};

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails: (state, action: PayloadAction<Email[]>) => {
      state.emails = action.payload;
    },
    setSelectedEmail: (state, action: PayloadAction<Email | null>) => {
      state.selectedEmail = action.payload;
      if (action.payload && !action.payload.isRead) {
        // Mark as read when selected
        const email = state.emails.find((e) => e.id === action.payload!.id);
        if (email) {
          email.isRead = true;
        }
      }
    },
    setCurrentFolder: (state, action: PayloadAction<string>) => {
      state.currentFolder = action.payload;
      state.selectedEmail = null; // Clear selection when changing folders
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleStar: (state, action: PayloadAction<number>) => {
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) {
        email.isStarred = !email.isStarred;
      }
      if (state.selectedEmail?.id === action.payload) {
        state.selectedEmail.isStarred = !state.selectedEmail.isStarred;
      }
    },
    deleteEmail: (state, action: PayloadAction<number>) => {
      state.emails = state.emails.filter((e) => e.id !== action.payload);
      if (state.selectedEmail?.id === action.payload) {
        state.selectedEmail = null;
      }
      delete state.messages[action.payload];
    },
    addMessage: (state, action: PayloadAction<{ emailId: number; message: Message }>) => {
      if (!state.messages[action.payload.emailId]) {
        state.messages[action.payload.emailId] = [];
      }
      state.messages[action.payload.emailId].push(action.payload.message);
    },
    setMessages: (state, action: PayloadAction<{ emailId: number; messages: Message[] }>) => {
      state.messages[action.payload.emailId] = action.payload.messages;
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) {
        email.isRead = true;
      }
    },
    markAsUnread: (state, action: PayloadAction<number>) => {
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) {
        email.isRead = false;
      }
    },
    archiveEmail: (state, action: PayloadAction<number>) => {
      const email = state.emails.find((e) => e.id === action.payload);
      if (email) {
        email.isRead = true;
        // In a real app, you'd move it to archive folder
      }
    },
    openCompose: (state, action: PayloadAction<Email | undefined>) => {
      state.isComposeOpen = true;
      if (action.payload) {
        // Open draft for editing
        state.editingDraftId = action.payload.id;
        state.composeEmail = {
          to: action.payload.to || "",
          subject: action.payload.subject || "",
          body: action.payload.body || "",
        };
      } else {
        state.editingDraftId = null;
        state.composeEmail = { to: "", subject: "", body: "" };
      }
    },
    closeCompose: (state) => {
      state.isComposeOpen = false;
      state.composeEmail = { to: "", subject: "", body: "" };
      state.editingDraftId = null;
    },
    updateComposeEmail: (state, action: PayloadAction<Partial<ComposeEmail>>) => {
      state.composeEmail = { ...state.composeEmail, ...action.payload };
    },
    saveDraft: (state) => {
      if (state.composeEmail.to || state.composeEmail.subject || state.composeEmail.body) {
        // If updating existing draft
        if (state.editingDraftId) {
          const draftIndex = state.drafts.findIndex((d) => d.id === state.editingDraftId);
          if (draftIndex !== -1) {
            state.drafts[draftIndex] = {
              ...state.drafts[draftIndex],
              to: state.composeEmail.to,
              subject: state.composeEmail.subject || "(No Subject)",
              preview: state.composeEmail.body.substring(0, 50) + "...",
              body: state.composeEmail.body,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
          }
        } else {
          // Create new draft
          const draft: Email = {
            id: Date.now(),
            sender: "You",
            to: state.composeEmail.to,
            subject: state.composeEmail.subject || "(No Subject)",
            preview: state.composeEmail.body.substring(0, 50) + "...",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isStarred: false,
            isRead: true,
            folder: "Draft",
            body: state.composeEmail.body,
          };
          state.drafts.push(draft);
        }
        state.composeEmail = { to: "", subject: "", body: "" };
        state.editingDraftId = null;
      }
    },
    sendEmail: (state) => {
      if (state.composeEmail.to && state.composeEmail.subject) {
        const sentEmail: Email = {
          id: Date.now(),
          sender: "You",
          to: state.composeEmail.to,
          subject: state.composeEmail.subject,
          preview: state.composeEmail.body.substring(0, 50) + "...",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isStarred: false,
          isRead: true,
          folder: "Sent",
          body: state.composeEmail.body,
        };
        state.emails.push(sentEmail);
        
        // If sending from draft, remove the draft
        if (state.editingDraftId) {
          state.drafts = state.drafts.filter((d) => d.id !== state.editingDraftId);
        }
        
        state.composeEmail = { to: "", subject: "", body: "" };
        state.editingDraftId = null;
        state.isComposeOpen = false;
      }
    },
    deleteDraft: (state, action: PayloadAction<number>) => {
      state.drafts = state.drafts.filter((d) => d.id !== action.payload);
    },
  },
});

export const {
  setEmails,
  setSelectedEmail,
  setCurrentFolder,
  setSearchQuery,
  toggleStar,
  deleteEmail,
  addMessage,
  setMessages,
  markAsRead,
  markAsUnread,
  archiveEmail,
  openCompose,
  closeCompose,
  updateComposeEmail,
  saveDraft,
  sendEmail,
  deleteDraft,
} = emailsSlice.actions;

export default emailsSlice.reducer;

