/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as BlogRouteImport } from './routes/blog/route'
import { Route as IndexImport } from './routes/index'
import { Route as BlogIndexImport } from './routes/blog/index'
import { Route as BlogSlugImport } from './routes/blog/$slug'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const BlogRouteRoute = BlogRouteImport.update({
  path: '/blog',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const BlogIndexRoute = BlogIndexImport.update({
  path: '/',
  getParentRoute: () => BlogRouteRoute,
} as any)

const BlogSlugRoute = BlogSlugImport.update({
  path: '/$slug',
  getParentRoute: () => BlogRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/blog': {
      id: '/blog'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof BlogRouteImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/blog/$slug': {
      id: '/blog/$slug'
      path: '/$slug'
      fullPath: '/blog/$slug'
      preLoaderRoute: typeof BlogSlugImport
      parentRoute: typeof BlogRouteImport
    }
    '/blog/': {
      id: '/blog/'
      path: '/'
      fullPath: '/blog/'
      preLoaderRoute: typeof BlogIndexImport
      parentRoute: typeof BlogRouteImport
    }
  }
}

// Create and export the route tree

interface BlogRouteRouteChildren {
  BlogSlugRoute: typeof BlogSlugRoute
  BlogIndexRoute: typeof BlogIndexRoute
}

const BlogRouteRouteChildren: BlogRouteRouteChildren = {
  BlogSlugRoute: BlogSlugRoute,
  BlogIndexRoute: BlogIndexRoute,
}

const BlogRouteRouteWithChildren = BlogRouteRoute._addFileChildren(
  BlogRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/blog': typeof BlogRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/blog/$slug': typeof BlogSlugRoute
  '/blog/': typeof BlogIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/blog/$slug': typeof BlogSlugRoute
  '/blog': typeof BlogIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/blog': typeof BlogRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/blog/$slug': typeof BlogSlugRoute
  '/blog/': typeof BlogIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/blog' | '/about' | '/blog/$slug' | '/blog/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/blog/$slug' | '/blog'
  id: '__root__' | '/' | '/blog' | '/about' | '/blog/$slug' | '/blog/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BlogRouteRoute: typeof BlogRouteRouteWithChildren
  AboutRoute: typeof AboutRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BlogRouteRoute: BlogRouteRouteWithChildren,
  AboutRoute: AboutRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/blog",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/blog": {
      "filePath": "blog/route.tsx",
      "children": [
        "/blog/$slug",
        "/blog/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/blog/$slug": {
      "filePath": "blog/$slug.tsx",
      "parent": "/blog"
    },
    "/blog/": {
      "filePath": "blog/index.tsx",
      "parent": "/blog"
    }
  }
}
ROUTE_MANIFEST_END */
