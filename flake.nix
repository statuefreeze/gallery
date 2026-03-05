{
  description = "ASFR Gallery - reproducible dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            git
            nodejs_22
            pnpm_10
            supabase-cli
          ];

          shellHook = ''
            export NODE_ENV=development
            echo "ASFR Gallery dev shell (Nix) activated for ${system}"
          '';
        };
      });
}

