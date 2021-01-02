#include <dirent.h>
#include <stdio.h>
#include <string.h>

#define NORMAL_COLOR  "\x1B[0m"
#define GREEN  "\x1B[32m"
#define BLUE  "\x1B[34m"



/* let us make a recursive function to print the content of a given folder */

void get_dir_content(char * path, FILE * fp, char * subsec)
{
  DIR * d = opendir(path); // open the path
  if(d==NULL) return; // if was not able return
  struct dirent * dir; // for the directory entries;

  while ((dir = readdir(d)) != NULL) // if we were able to read somehting from the directory
    {
      if(dir-> d_type != DT_DIR) // if the type is not directory just print it with blue
      {
        printf("%s%s\n",BLUE, dir->d_name);
        fprintf(fp,"\n%s",subsec);
        fprintf(fp,",%s",dir->d_name);
        fprintf(fp,", ,");
      }
      else
      if(dir -> d_type == DT_DIR && strcmp(dir->d_name,".")!=0 && strcmp(dir->d_name,"..")!=0 ) // if it is a directory
      {
        printf("%s%s\n",GREEN, dir->d_name); // print its name in green
        char d_path[255]; // here I am using sprintf which is safer than strcat
        sprintf(d_path, "%s/%s", path, dir->d_name);
        strncpy(subsec, dir->d_name, 254);
        subsec[254] = '\0';
        get_dir_content(d_path, fp, subsec); // recall with the new path
      }
    }
    closedir(d); // finally close the directory
}

int main(int argc)
{

  printf("%s\n", NORMAL_COLOR);

    FILE *fp;
    char *filename;
    filename="gallery-info-new.csv";
    fp=fopen(filename,"w+");
    fprintf(fp,"subsec,filename,title,description");
    printf("\n%sfile created \n",filename);

    char subsec[255];
    get_dir_content("gallery-images", fp, subsec);

    fclose(fp);

  printf("%s\n", NORMAL_COLOR);
  return(0);
}
