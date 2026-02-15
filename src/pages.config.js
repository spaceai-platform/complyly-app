/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Account from './pages/Account';
import Analysis from './pages/Analysis';
import CategorySelection from './pages/CategorySelection';
import CompareDocuments from './pages/CompareDocuments';
import ComparisonResult from './pages/ComparisonResult';
import Dashboard from './pages/Dashboard';
import DocumentDetail from './pages/DocumentDetail';
import Documents from './pages/Documents';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import LegalDisclaimer from './pages/LegalDisclaimer';
import May2026Checklist from './pages/May2026Checklist';
import PreviewInsight from './pages/PreviewInsight';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RentersRightsAct from './pages/RentersRightsAct';
import Support from './pages/Support';
import TermsOfService from './pages/TermsOfService';
import Upload from './pages/Upload';


export const PAGES = {
    "Account": Account,
    "Analysis": Analysis,
    "CategorySelection": CategorySelection,
    "CompareDocuments": CompareDocuments,
    "ComparisonResult": ComparisonResult,
    "Dashboard": Dashboard,
    "DocumentDetail": DocumentDetail,
    "Documents": Documents,
    "FAQ": FAQ,
    "Home": Home,
    "LegalDisclaimer": LegalDisclaimer,
    "May2026Checklist": May2026Checklist,
    "PreviewInsight": PreviewInsight,
    "PrivacyPolicy": PrivacyPolicy,
    "RentersRightsAct": RentersRightsAct,
    "Support": Support,
    "TermsOfService": TermsOfService,
    "Upload": Upload,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};