
# Notes

This is to provide a few notes/ideas about this directory and it's function/structure

## if => file
If a file is in this directory, it is treated as a regular as3 declaration and posted as defined.

## if => directory
If there is a sub-directory here, that directory and all it's files, are considered an entire tenant.  All the files in that sub-directory, will be combined into a single post
- This was to support customers with very large tenants.  They would be able to break down each application into seperate files.  This cli or deployment tool would combine everything and deploy